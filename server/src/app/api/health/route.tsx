import connectDB from "@/lib/dbConnect";
import mongoose from "mongoose";
import { NextResponse } from "next/server"

export async function GET() {
    try {
        await connectDB();

      
        const state = mongoose.connection.readyState;

        const stateMap: Record<number, string> = {
            0: "Disconnected",
            1: "Connected",
            2: "Connecting",
            3: "Disconnecting",
        };

        const isConnected = state === 1;

        return NextResponse.json(
            {
                success: true,
                message: "Server is running",
                db: {
                    status: stateMap[state],
                    isConnected,
                    host: isConnected ? mongoose.connection.host : null,
                    dbName: isConnected ? mongoose.connection.name : null,
                }
            },
            { status: 200 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: "Server is running but DB connection failed",
                db: {
                    status: "Disconnected",
                    isConnected: false,
                }
            },
            { status: 500 }
        );
    }
}