import { NextRequest, NextResponse } from "next/server";
import { verifyRefreshToken, generateAccessToken } from "@/lib/auth";
import {
    TokenPayload,
} from "@/lib/auth";

export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { success: false, message: "No refresh token found" },
      { status: 401 }
    );
  }

  try {
    const decoded = verifyRefreshToken(refreshToken) as TokenPayload ;
    const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });

    return NextResponse.json({ success: true, accessToken: newAccessToken });
  } catch {
    return NextResponse.json(
      { success: false, message: "Refresh token invalid or expired" },
      { status: 401 }
    );
  }
}