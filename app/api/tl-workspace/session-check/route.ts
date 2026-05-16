import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { sessionCookieName, verifyWorkspaceSessionToken } from "@/lib/tl-workspace-auth";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get(sessionCookieName)?.value;
  const session = verifyWorkspaceSessionToken(token);

  if (!session) {
    return new NextResponse(null, { status: 401 });
  }

  return new NextResponse(null, {
    status: 204,
    headers: {
      "X-Teleaon-Workspace-User": session.email
    }
  });
}
