import { createHmac, createHash, randomBytes, scryptSync, timingSafeEqual } from "crypto";

type WorkspaceUserDocument = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: "admin" | "employee";
  status: "active";
  createdAt: string;
  updatedAt: string;
};

export type WorkspaceSession = {
  id: string;
  email: string;
  name: string;
  role: "admin" | "employee";
};

const workspaceUsersIndex = `${process.env.OPENSEARCH_INDEX_PREFIX || "teleaon"}_workspace_users`;
const defaultWorkspaceEmail = "info@teleaon.ai";
const defaultWorkspacePassword = "Asean@12345";
const sessionCookieName = "tl_workspace_session";

function getOpenSearchConfig() {
  const url = process.env.OPENSEARCH_URL;
  const username = process.env.OPENSEARCH_USERNAME;
  const password = process.env.OPENSEARCH_PASSWORD;

  if (!url || !username || !password) return null;

  return {
    url: url.replace(/\/$/, ""),
    authHeader: `Basic ${Buffer.from(`${username}:${password}`).toString("base64")}`
  };
}

function getSessionSecret() {
  return process.env.TL_WORKSPACE_SECRET || process.env.NEXTAUTH_SECRET || "teleaon-local-workspace-secret";
}

function userIdForEmail(email: string) {
  return createHash("sha256").update(email.toLowerCase()).digest("hex");
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function assertEmployeeEmail(email: string) {
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error("Enter a valid employee email address.");
  }

  if (!email.endsWith("@teleaon.ai")) {
    throw new Error("TL WorkSpace is only for Teleaon employee email addresses.");
  }
}

function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `scrypt:${salt}:${hash}`;
}

function verifyPassword(password: string, storedHash: string) {
  const [method, salt, hash] = storedHash.split(":");
  if (method !== "scrypt" || !salt || !hash) return false;

  const expected = Buffer.from(hash, "hex");
  const actual = scryptSync(password, salt, 64);

  return expected.length === actual.length && timingSafeEqual(expected, actual);
}

async function openSearchFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const config = getOpenSearchConfig();
  if (!config) {
    throw new Error("OpenSearch is not configured.");
  }

  const response = await fetch(`${config.url}${path}`, {
    ...init,
    headers: {
      Authorization: config.authHeader,
      "Content-Type": "application/json",
      ...init.headers
    },
    cache: "no-store"
  });

  if (response.status === 404) {
    throw new Error("OpenSearch document was not found.");
  }

  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error(detail || `OpenSearch request failed with ${response.status}.`);
  }

  return (await response.json()) as T;
}

async function ensureWorkspaceIndex() {
  const config = getOpenSearchConfig();
  if (!config) {
    throw new Error("OpenSearch is not configured.");
  }

  const response = await fetch(`${config.url}/${workspaceUsersIndex}`, {
    method: "HEAD",
    headers: {
      Authorization: config.authHeader
    },
    cache: "no-store"
  });

  if (response.status === 200) return;

  await openSearchFetch(`/${workspaceUsersIndex}`, {
    method: "PUT",
    body: JSON.stringify({
      mappings: {
        properties: {
          email: { type: "keyword" },
          name: { type: "text" },
          role: { type: "keyword" },
          status: { type: "keyword" },
          createdAt: { type: "date" },
          updatedAt: { type: "date" }
        }
      }
    })
  });
}

async function getWorkspaceUserByEmail(email: string) {
  const normalizedEmail = normalizeEmail(email);
  await ensureWorkspaceIndex();

  try {
    const result = await openSearchFetch<{ _source?: WorkspaceUserDocument }>(`/${workspaceUsersIndex}/_doc/${userIdForEmail(normalizedEmail)}`);
    return result._source || null;
  } catch {
    return null;
  }
}

async function seedDefaultWorkspaceAdmin() {
  await ensureWorkspaceIndex();

  const existing = await getWorkspaceUserByEmail(defaultWorkspaceEmail);
  if (existing) return;

  const now = new Date().toISOString();
  const user: WorkspaceUserDocument = {
    id: userIdForEmail(defaultWorkspaceEmail),
    email: defaultWorkspaceEmail,
    name: "Teleaon Admin",
    passwordHash: hashPassword(defaultWorkspacePassword),
    role: "admin",
    status: "active",
    createdAt: now,
    updatedAt: now
  };

  await openSearchFetch(`/${workspaceUsersIndex}/_doc/${user.id}?refresh=true`, {
    method: "PUT",
    body: JSON.stringify(user)
  });
}

export async function createWorkspaceUser({
  email,
  password,
  name
}: {
  email: string;
  password: string;
  name?: string;
}) {
  const normalizedEmail = normalizeEmail(email);
  assertEmployeeEmail(normalizedEmail);

  if (password.length < 8) {
    throw new Error("Use at least 8 characters for the password.");
  }

  await seedDefaultWorkspaceAdmin();

  const existing = await getWorkspaceUserByEmail(normalizedEmail);
  if (existing) {
    throw new Error("This employee account already exists. Please sign in.");
  }

  const now = new Date().toISOString();
  const user: WorkspaceUserDocument = {
    id: userIdForEmail(normalizedEmail),
    email: normalizedEmail,
    name: name?.trim() || normalizedEmail.split("@")[0],
    passwordHash: hashPassword(password),
    role: normalizedEmail === defaultWorkspaceEmail ? "admin" : "employee",
    status: "active",
    createdAt: now,
    updatedAt: now
  };

  await openSearchFetch(`/${workspaceUsersIndex}/_doc/${user.id}?refresh=true`, {
    method: "PUT",
    body: JSON.stringify(user)
  });

  return toSession(user);
}

export async function authenticateWorkspaceUser(email: string, password: string) {
  const normalizedEmail = normalizeEmail(email);
  assertEmployeeEmail(normalizedEmail);
  await seedDefaultWorkspaceAdmin();

  const user = await getWorkspaceUserByEmail(normalizedEmail);
  if (!user || user.status !== "active" || !verifyPassword(password, user.passwordHash)) {
    throw new Error("Employee email or password is incorrect.");
  }

  return toSession(user);
}

function toSession(user: WorkspaceUserDocument): WorkspaceSession {
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role
  };
}

export function createWorkspaceSessionToken(session: WorkspaceSession) {
  const payload = {
    ...session,
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");
  return `${encodedPayload}.${signature}`;
}

export function verifyWorkspaceSessionToken(token?: string) {
  if (!token || !token.includes(".")) return null;

  const [encodedPayload, signature] = token.split(".");
  const expectedSignature = createHmac("sha256", getSessionSecret()).update(encodedPayload).digest("base64url");

  if (signature.length !== expectedSignature.length || !timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8")) as WorkspaceSession & { exp: number };
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) return null;

    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      role: payload.role
    } satisfies WorkspaceSession;
  } catch {
    return null;
  }
}

export { sessionCookieName };
