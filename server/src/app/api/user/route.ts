import connectDB from "@/lib/dbConnect";
import user from "@/models/user";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "../../../middleware/auth";

// get the route of user and related

//create

export async function POST(
    request: NextRequest
) {
    const auth = withAuth(request);
    try {
        const body = await request.json();

        const { email, username, password } = body;
        if (!email || !username || !password) {
            return NextResponse.json(
                {
                    success: false,
                    message: "All fields are required",
                },
                {
                    status: 400,
                }
            );
        }
        await connectDB();
        const olduser = await user.findOne({ email });
        if (!olduser) {
            const hasedPassword = await bcrypt.hash(password, 10);
            const newUser = await user.create({
                email,
                username,
                password: hasedPassword
            })
            return NextResponse.json(
                {
                    success: true,
                    newUser
                },
                {
                    status: 201,
                }
            );
        }

        return NextResponse.json(
            {
                success: false,
                message: "user already exist"
            },
            { status: 409 },
        );
    } catch (e) {
        console.error("Internal server error")
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error"
            },
            { status: 500 },
        );
    }
}
//getby id
//getall
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    try {
      await  connectDB();
      if(id){
        const dbUser  =  await user.findById(id);
        if(!dbUser){
        return NextResponse.json(
            {
                success: false,
                message: "no user were found by this id"    
            }, { status: 404 }
        )  
        
        }
     return NextResponse.json(
            {
                success: true,
                dbUser       
            }, { status: 200 }
        )  
    }
    const allUser = await user.find();
         return NextResponse.json(
            {
                success: true,
                allUser       
            }, { status: 200 }
        )  
       
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Internal server error"
            }, { status: 500 }
        )
    }
}

//delete
export async function DELETE(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        if (!id) {
            return NextResponse.json(
                { success: false, message: "User id is required" },
                { status: 400 }
            );
        }

        await connectDB();

        const deletedUser = await user.findByIdAndDelete(id);

        if (!deletedUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "User deleted successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Internal server error", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
//update
export async function PUT(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    try {
        if (!id) {
            return NextResponse.json(
                { success: false, message: "User id is required" },
                { status: 400 }
            );
        }

        const body = await request.json();
        const { username, password } = body;

        if (!username && !password) {
            return NextResponse.json(
                { success: false, message: "Provide at least one field to update" },
                { status: 400 }
            );
        }

        await connectDB();

        // build update object dynamically
        const updateData: { username?: string; password?: string } = {};
        if (username) updateData.username = username;
        if (password) updateData.password = await bcrypt.hash(password, 10); // ✅ hash new password

        const updatedUser = await user.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true }           // ✅ returns updated doc
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: "User not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, updatedUser },
            { status: 200 }
        );

    } catch (error) {
        console.error("Internal server error", error);
        return NextResponse.json(
            { success: false, message: "Internal server error" },
            { status: 500 }
        );
    }
}
