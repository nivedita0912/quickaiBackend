import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN as string;
if (!ACCESS_TOKEN_SECRET) throw new Error("ACCESS_TOKEN is not defined in .env");

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN as string;
if (!REFRESH_TOKEN_SECRET) throw new Error("REFRESH_SECRET is not defined in .env");

export interface TokenPayload {
    id: string;
    role: string;
    iat: number;
    exp: number;
}

// ✅ Fix 1: Remove async — jwt.sign is synchronous
export function generateAccessToken({ id, role }: { id: string; role: string }): string {
    try {
        return jwt.sign({ id, role }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    } catch {
        throw new Error("Problem in creating access token");
    }
}

// ✅ Fix 1: Remove async — jwt.sign is synchronous
export function generateRefreshToken({ id, role }: { id: string; role: string }): string {
    try {
        return jwt.sign({ id, role }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
    } catch {
        throw new Error("Problem in creating refresh token");
    }
}

// ✅ Fix 2: Re-throw original error so TokenExpiredError name is preserved
export function verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as TokenPayload;
}

export function verifyRefreshToken(token: string): TokenPayload {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as TokenPayload;
}

export function checkAccessToken(request: NextRequest): TokenPayload {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new Error("No access token provided");
    }
    return verifyAccessToken(authHeader.split(" ")[1]);
}

export function checkRefreshToken(request: NextRequest): TokenPayload {
    const token = request.cookies.get("refreshToken")?.value;
    if (!token) throw new Error("No refresh token provided");
    return verifyRefreshToken(token);
}

export function refreshAccessToken(request: NextRequest): NextResponse {
    try {
        const payload = checkRefreshToken(request);
        const newAccessToken = generateAccessToken({ id: payload.id, role: payload.role });
        return NextResponse.json({ success: true, accessToken: newAccessToken }, { status: 200 });
    } catch {
        return NextResponse.json(
            { success: false, message: "Invalid or expired refresh token, please login again" },
            { status: 401 }
        );
    }
}