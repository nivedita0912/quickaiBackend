// check the health of server
import { NextResponse } from "next/server";
import mongoose from "mongoose";

export async function GET() {
  const dbState = mongoose.connection.readyState;

  return NextResponse.json({
    success: true,
    server: "running",
    database:
      dbState === 1 ? "connected" : "disconnected",
    uptime: process.uptime(),
    timestamp: new Date(),
  });
}