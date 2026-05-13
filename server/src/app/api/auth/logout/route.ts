import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const response = NextResponse.json({ message: "Logged out successfully" });

  // Clear access token cookie
  response.cookies.set("refresh", "", { maxAge: 0, path: "/" });

  return response;
}