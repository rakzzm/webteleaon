import { NextResponse } from "next/server";
import { verifyEmailCode } from "@/lib/opensearch-auth-store";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; code?: string };
    const user = await verifyEmailCode(body.email || "", body.code || "");

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Email verification failed." },
      { status: 400 }
    );
  }
}
