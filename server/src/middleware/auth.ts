import { NextRequest } from "next/server";
import {
    TokenPayload,
    verifyAccessToken,
    verifyRefreshToken,
    generateAccessToken,
} from "@/lib/auth";

export type AuthResult =
    | { success: false; response: Response }
    | { success: true; decoded: TokenPayload; newAccessToken?: string };

export function withAuth(request: NextRequest): AuthResult {
    const refreshToken = request.cookies.get("refreshToken")?.value;
    const accessToken = request.headers.get("Authorization")?.replace("Bearer ", "");

    // Case 0: No refresh token — reject immediately
    if (!refreshToken) {
        return {
            success: false,
            response: Response.json(
                { success: false, message: "Unauthorized: No token provided" },
                { status: 401 }
            ),
        };
    }

    // Case 1: Access token exists — verify it
    if (accessToken) {
        try {
            const decoded = verifyAccessToken(accessToken);
            return { success: true, decoded };

        } catch (error: any) {

            // Case 1a: Expired — regenerate from refresh token
            if (error.name === "TokenExpiredError") {
                try {
                    const decoded = verifyRefreshToken(refreshToken);
                    const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });
                    return { success: true, decoded, newAccessToken };
                } catch {
                    return {
                        success: false,
                        response: Response.json(
                            { success: false, message: "Unauthorized: Refresh token invalid or expired" },
                            { status: 401 }
                        ),
                    };
                }
            }

            // Case 1b: Malformed/invalid token
            return {
                success: false,
                response: Response.json(
                    { success: false, message: "Unauthorized: Invalid token" },
                    { status: 401 }
                ),
            };
        }
    }

    // Case 2: No access token — use refresh token to issue new one
    try {
        const decoded = verifyRefreshToken(refreshToken);
        const newAccessToken = generateAccessToken({ id: decoded.id, role: decoded.role });
        return { success: true, decoded, newAccessToken };
    } catch {
        return {
            success: false,
            response: Response.json(
                { success: false, message: "Unauthorized: Refresh token invalid or expired" },
                { status: 401 }
            ),
        };
    }
}