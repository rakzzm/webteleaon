import { NextRequest } from "next/server";
import { postHeyGenV3 } from "@/lib/heygen-v3-server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);

  return postHeyGenV3("/lipsyncs", body, {
    requiredFields: ["video.type", "video.url", "audio.type", "audio.url"]
  });
}
