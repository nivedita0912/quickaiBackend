import { generateAccessToken, generateRefreshToken } from "@/lib/auth";
import connectDB from "@/lib/dbConnect";
import user from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { email, password } = body;  

        if (!email || !password) {
            return NextResponse.json(
                { success: false, message: "All fields are required" },
                { status: 400 }
            );
        }

        await connectDB();  

        const existingUser = await user.findOne({ email });
        
        if (!existingUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        
        const isMatch = await bcrypt.compare(password, existingUser.password);
        if (!isMatch) {
            return NextResponse.json(
                { success: false, message: "Invalid credentials" },
                { status: 401 }
            );
        }

       
        const accessToken = await generateAccessToken({
            id: existingUser._id.toString(),
            role: existingUser.role ?? "user"
        });
        const refreshToken = await generateRefreshToken({
            id: existingUser._id.toString(),
            role: existingUser.role ?? "user"
        });

       
        const response = NextResponse.json(
            {
                success: true,
                message: "Login successful",
                accessToken,  
                user: {
                    id: existingUser._id,
                    email: existingUser.email,
                    username: existingUser.username,
                }
            },
            { status: 200 }
        );

       response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,    
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict", 
            maxAge: 7 * 24 * 60 * 60 * 1000  
        });

        return response;

    } catch (e) {
        console.error("Login error", e);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}