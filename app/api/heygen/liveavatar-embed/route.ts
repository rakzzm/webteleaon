import { NextResponse } from "next/server";

type LiveAvatarResponse<T> = {
  code?: number;
  data?: T;
  message?: string | null;
};

type AvatarSummary = {
  id: string;
  name?: string;
  status?: string;
  default_voice?: {
    id?: string;
    name?: string;
  };
};

type ContextSummary = {
  id: string;
  name?: string;
};

type EmbedResponse = {
  embed_id: string;
  url: string;
  script?: string;
  orientation?: "horizontal" | "vertical";
};

const LIVEAVATAR_API_BASE = "https://api.liveavatar.com";
const DEFAULT_CONTEXT_NAME = "Teleaon Website Avatar";
const DEFAULT_CONTEXT_PROMPT =
  "You are Teleaon AI, a warm and professional website video assistant for Malaysian businesses. Help visitors understand Teleaon's agentic AI platform, AI SaaS, CRM automation, support workflows, pricing, and demo booking. Keep replies concise, natural, and customer-facing. Ask one helpful follow-up question when it moves the conversation forward.";
const DEFAULT_OPENING_TEXT =
  "Hi, I am Teleaon AI. I can help with agentic AI, CRM automation, support workflows, pricing, or booking a demo.";

let cachedEmbed: { url: string; orientation: "horizontal" | "vertical"; createdAt: number } | null = null;
let cachedContextId: string | null = null;

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const explicitEmbedUrl = process.env.LIVEAVATAR_EMBED_URL || process.env.HEYGEN_LIVEAVATAR_EMBED_URL;

  if (explicitEmbedUrl) {
    return NextResponse.json({
      mode: "embed",
      url: explicitEmbedUrl,
      orientation: "vertical",
      source: "configured"
    });
  }

  if (cachedEmbed && Date.now() - cachedEmbed.createdAt < 1000 * 60 * 45) {
    return NextResponse.json({
      mode: "embed",
      url: cachedEmbed.url,
      orientation: cachedEmbed.orientation,
      source: "cache"
    });
  }

  const apiKey = process.env.LIVEAVATAR_API_KEY || process.env.HEYGEN_LIVEAVATAR_API_KEY || process.env.HEYGEN_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      {
        mode: "fallback",
        message: "HeyGen key is not configured on the server."
      },
      { status: 503 }
    );
  }

  try {
    const avatar = await resolveAvatar(apiKey);
    const contextId = await resolveContext(apiKey);
    const voiceId = process.env.LIVEAVATAR_VOICE_ID || process.env.HEYGEN_LIVEAVATAR_VOICE_ID || avatar.default_voice?.id;

    if (!avatar.id || !contextId || !voiceId) {
      return NextResponse.json(
        {
          mode: "fallback",
          message: "LiveAvatar needs an avatar, context, and voice before it can start a realtime embed."
        },
        { status: 424 }
      );
    }

    const embed = await createEmbed(apiKey, {
      avatarId: avatar.id,
      contextId,
      voiceId
    });

    cachedEmbed = {
      url: embed.url,
      orientation: embed.orientation || "vertical",
      createdAt: Date.now()
    };

    return NextResponse.json({
      mode: "embed",
      url: embed.url,
      orientation: embed.orientation || "vertical",
      source: "liveavatar"
    });
  } catch (error) {
    return NextResponse.json(
      {
        mode: "fallback",
        message: error instanceof Error ? error.message : "LiveAvatar is unavailable."
      },
      { status: 424 }
    );
  }
}

async function resolveAvatar(apiKey: string) {
  const configuredAvatarId = process.env.LIVEAVATAR_AVATAR_ID || process.env.HEYGEN_LIVEAVATAR_AVATAR_ID;

  if (configuredAvatarId) {
    return {
      id: configuredAvatarId,
      default_voice: {
        id: process.env.LIVEAVATAR_VOICE_ID || process.env.HEYGEN_LIVEAVATAR_VOICE_ID
      }
    } satisfies AvatarSummary;
  }

  const userAvatars = await liveAvatarFetch<Paginated<AvatarSummary>>(apiKey, "/v1/avatars").catch(() => null);
  const ownedAvatar =
    userAvatars?.results?.find((avatar) => avatar.status === "ACTIVE" && avatar.default_voice?.id) ||
    userAvatars?.results?.find((avatar) => avatar.status === "ACTIVE");

  if (ownedAvatar?.id) return ownedAvatar;

  const publicAvatars = await liveAvatarFetch<Paginated<AvatarSummary>>(apiKey, "/v1/avatars/public?page_size=20", { authenticated: false });
  const publicAvatar = publicAvatars.results.find((avatar) => avatar.status === "ACTIVE" && avatar.default_voice?.id) || publicAvatars.results[0];

  if (!publicAvatar?.id) {
    throw new Error("No LiveAvatar avatar is available for this account.");
  }

  return publicAvatar;
}

async function resolveContext(apiKey: string) {
  const configuredContextId = process.env.LIVEAVATAR_CONTEXT_ID || process.env.HEYGEN_LIVEAVATAR_CONTEXT_ID;
  if (configuredContextId) return configuredContextId;
  if (cachedContextId) return cachedContextId;

  const contexts = await liveAvatarFetch<Paginated<ContextSummary>>(apiKey, "/v1/contexts?page_size=50");
  const existing = contexts.results.find((context) => context.name === DEFAULT_CONTEXT_NAME);

  if (existing?.id) {
    cachedContextId = existing.id;
    return existing.id;
  }

  const created = await liveAvatarFetch<ContextSummary>(apiKey, "/v1/contexts", {
    method: "POST",
    body: {
      name: DEFAULT_CONTEXT_NAME,
      prompt: DEFAULT_CONTEXT_PROMPT,
      opening_text: DEFAULT_OPENING_TEXT,
      links: []
    }
  });

  cachedContextId = created.id;
  return created.id;
}

async function createEmbed(
  apiKey: string,
  {
    avatarId,
    contextId,
    voiceId
  }: {
    avatarId: string;
    contextId: string;
    voiceId: string;
  }
) {
  return liveAvatarFetch<EmbedResponse>(apiKey, "/v2/embeddings", {
    method: "POST",
    body: {
      avatar_id: avatarId,
      context_id: contextId,
      voice_id: voiceId,
      type: "DEFAULT",
      max_session_duration: 300,
      default_language: "en",
      is_sandbox: false,
      orientation: "vertical"
    }
  });
}

type Paginated<T> = {
  count?: number;
  results: T[];
};

async function liveAvatarFetch<T>(
  apiKey: string,
  path: string,
  options: {
    method?: "GET" | "POST";
    body?: Record<string, unknown>;
    authenticated?: boolean;
  } = {}
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json"
  };

  if (options.authenticated !== false) {
    headers["X-API-KEY"] = apiKey;
  }

  const response = await fetch(`${LIVEAVATAR_API_BASE}${path}`, {
    method: options.method || "GET",
    headers,
    body: options.body ? JSON.stringify(options.body) : undefined,
    cache: "no-store"
  });

  const payload = (await response.json().catch(() => null)) as LiveAvatarResponse<T> | null;

  if (!response.ok || !payload?.data) {
    const message = payload?.message || "LiveAvatar request failed.";
    throw new Error(message);
  }

  return payload.data;
}
