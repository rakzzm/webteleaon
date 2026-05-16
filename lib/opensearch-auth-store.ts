import { createHash, randomInt, randomUUID } from "crypto";

type OpenSearchUser = {
  id: string;
  email: string;
  name?: string;
  image?: string;
  status: "verified";
  verifiedAt: string;
  createdAt: string;
  updatedAt: string;
};

type VerificationDocument = {
  id: string;
  email: string;
  name?: string;
  codeHash: string;
  attempts: number;
  expiresAt: string;
  consumedAt?: string;
  createdAt: string;
};

export type VerificationRequestResult = {
  email: string;
  expiresAt: string;
  emailSent: boolean;
  deliveryMessage: string;
  devCode?: string;
};

const usersIndex = `${process.env.OPENSEARCH_INDEX_PREFIX || "teleaon"}_users`;
const verificationsIndex = `${process.env.OPENSEARCH_INDEX_PREFIX || "teleaon"}_email_verifications`;

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

function userIdForEmail(email: string) {
  return createHash("sha256").update(email.toLowerCase()).digest("hex");
}

function codeHash(code: string) {
  const secret = process.env.NEXTAUTH_SECRET || "teleaon-local-secret";
  return createHash("sha256").update(`${code}.${secret}`).digest("hex");
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

async function ensureIndex(index: string, body: Record<string, unknown>) {
  const config = getOpenSearchConfig();
  if (!config) return;

  const response = await fetch(`${config.url}/${index}`, {
    method: "HEAD",
    headers: {
      Authorization: config.authHeader
    },
    cache: "no-store"
  });

  if (response.status === 200) return;

  await openSearchFetch(`/${index}`, {
    method: "PUT",
    body: JSON.stringify(body)
  });
}

async function ensureAuthIndexes() {
  await Promise.all([
    ensureIndex(usersIndex, {
      mappings: {
        properties: {
          email: { type: "keyword" },
          name: { type: "text" },
          status: { type: "keyword" },
          verifiedAt: { type: "date" },
          createdAt: { type: "date" },
          updatedAt: { type: "date" }
        }
      }
    }),
    ensureIndex(verificationsIndex, {
      mappings: {
        properties: {
          email: { type: "keyword" },
          name: { type: "text" },
          codeHash: { type: "keyword" },
          attempts: { type: "integer" },
          expiresAt: { type: "date" },
          consumedAt: { type: "date" },
          createdAt: { type: "date" }
        }
      }
    })
  ]);
}

export function isOpenSearchAuthConfigured() {
  return Boolean(getOpenSearchConfig());
}

export async function getVerifiedUserByEmail(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) return null;

  if (!isOpenSearchAuthConfigured()) {
    if (process.env.NODE_ENV === "production") return null;

    return {
      id: normalizedEmail,
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0]
    };
  }

  await ensureAuthIndexes();

  try {
    const result = await openSearchFetch<{ _source?: OpenSearchUser }>(`/${usersIndex}/_doc/${userIdForEmail(normalizedEmail)}`);
    const user = result._source;

    if (!user || user.status !== "verified") return null;

    return {
      id: user.id,
      email: user.email,
      name: user.name || user.email.split("@")[0],
      image: user.image
    };
  } catch {
    return null;
  }
}

export async function createEmailVerification(email: string, name?: string): Promise<{ code: string; email: string; expiresAt: string }> {
  const normalizedEmail = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error("Enter a valid email address.");
  }

  if (!isOpenSearchAuthConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Signup database is not configured.");
    }
  } else {
    await ensureAuthIndexes();
  }

  const code = String(randomInt(100000, 1000000));
  const now = new Date();
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000).toISOString();

  const document: VerificationDocument = {
    id: randomUUID(),
    email: normalizedEmail,
    name: name?.trim() || normalizedEmail.split("@")[0],
    codeHash: codeHash(code),
    attempts: 0,
    expiresAt,
    createdAt: now.toISOString()
  };

  if (isOpenSearchAuthConfigured()) {
    await openSearchFetch(`/${verificationsIndex}/_doc/${document.id}?refresh=true`, {
      method: "PUT",
      body: JSON.stringify(document)
    });
  }

  return { code, email: normalizedEmail, expiresAt };
}

export async function verifyEmailCode(email: string, code: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const normalizedCode = code.trim();

  if (!/^\d{6}$/.test(normalizedCode)) {
    throw new Error("Enter the 6 digit verification code.");
  }

  if (!isOpenSearchAuthConfigured()) {
    if (process.env.NODE_ENV === "production") {
      throw new Error("Signup database is not configured.");
    }

    return {
      id: normalizedEmail,
      email: normalizedEmail,
      name: normalizedEmail.split("@")[0]
    };
  }

  await ensureAuthIndexes();

  const search = await openSearchFetch<{
    hits?: { hits?: Array<{ _id: string; _source: VerificationDocument }> };
  }>(`/${verificationsIndex}/_search`, {
    method: "POST",
    body: JSON.stringify({
      size: 1,
      sort: [{ createdAt: { order: "desc" } }],
      query: {
        bool: {
          must: [{ term: { email: normalizedEmail } }],
          must_not: [{ exists: { field: "consumedAt" } }]
        }
      }
    })
  });

  const hit = search.hits?.hits?.[0];
  const verification = hit?._source;

  if (!hit || !verification) {
    throw new Error("No active verification code was found. Please request a new code.");
  }

  if (new Date(verification.expiresAt).getTime() < Date.now()) {
    throw new Error("Verification code expired. Please request a new code.");
  }

  if (verification.attempts >= 5) {
    throw new Error("Too many verification attempts. Please request a new code.");
  }

  if (verification.codeHash !== codeHash(normalizedCode)) {
    await openSearchFetch(`/${verificationsIndex}/_update/${hit._id}?refresh=true`, {
      method: "POST",
      body: JSON.stringify({
        script: {
          source: "ctx._source.attempts = (ctx._source.attempts ?: 0) + 1"
        }
      })
    });
    throw new Error("Verification code is incorrect.");
  }

  const now = new Date().toISOString();
  const user: OpenSearchUser = {
    id: userIdForEmail(normalizedEmail),
    email: normalizedEmail,
    name: verification.name || normalizedEmail.split("@")[0],
    status: "verified",
    verifiedAt: now,
    createdAt: now,
    updatedAt: now
  };

  await Promise.all([
    openSearchFetch(`/${verificationsIndex}/_update/${hit._id}?refresh=true`, {
      method: "POST",
      body: JSON.stringify({
        doc: {
          consumedAt: now
        }
      })
    }),
    openSearchFetch(`/${usersIndex}/_doc/${user.id}?refresh=true`, {
      method: "PUT",
      body: JSON.stringify(user)
    })
  ]);

  return {
    id: user.id,
    email: user.email,
    name: user.name
  };
}
