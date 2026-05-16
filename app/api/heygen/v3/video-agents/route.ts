import { NextRequest } from "next/server";
import { postHeyGenV3 } from "@/lib/heygen-v3-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const payload = applyHeyGenDefaults(body);

  return postHeyGenV3("/video-agents", payload, {
    requiredFields: ["prompt"]
  });
}

function applyHeyGenDefaults(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return body;

  return {
    ...(process.env.HEYGEN_DEFAULT_AVATAR_ID ? { avatar_id: process.env.HEYGEN_DEFAULT_AVATAR_ID } : {}),
    ...(process.env.HEYGEN_DEFAULT_VOICE_ID ? { voice_id: process.env.HEYGEN_DEFAULT_VOICE_ID } : {}),
    ...body
  };
}
