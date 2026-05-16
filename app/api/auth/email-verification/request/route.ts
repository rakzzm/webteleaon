import { NextResponse } from "next/server";
import { createEmailVerification } from "@/lib/opensearch-auth-store";
import { sendSignupVerificationEmail } from "@/lib/email-verification";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; name?: string };
    const verification = await createEmailVerification(body.email || "", body.name);
    const delivery = await sendSignupVerificationEmail({
      email: verification.email,
      code: verification.code
    });

    return NextResponse.json({
      email: verification.email,
      expiresAt: verification.expiresAt,
      emailSent: delivery.sent,
      message: delivery.message,
      devCode: process.env.SIGNUP_SHOW_VERIFICATION_CODE === "true" ? verification.code : undefined
    });
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Could not start email verification." },
      { status: 400 }
    );
  }
}
