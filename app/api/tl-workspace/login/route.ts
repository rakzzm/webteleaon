import { NextResponse } from "next/server";
import { authenticateWorkspaceUser, createWorkspaceSessionToken, sessionCookieName } from "@/lib/tl-workspace-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const session = await authenticateWorkspaceUser(body.email || "", body.password || "");
    const token = createWorkspaceSessionToken(session);
    const response = NextResponse.json({ ok: true, user: session, redirectTo: "/crm/" });

    response.cookies.set(sessionCookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 12
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { ok: false, message: error instanceof Error ? error.message : "Could not sign in." },
      { status: 401 }
    );
  }
}
