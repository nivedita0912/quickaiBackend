import mongoose from "mongoose";

const MONGO_URL = process.env.MONGODB_URI;
if (!MONGO_URL) {
    throw new Error("Enter the DATABASE_URL");
}

declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null;
    }
}

let cached = global.mongooseCache;

if (!cached) {
    cached = global.mongooseCache = { conn: null, promise: null };
}

async function connectDB() {
    if (cached.conn) {
        return cached.conn;       
    }

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGO_URL!) ; 
    }

    cached.conn = await cached.promise ;  
    return cached.conn;
}

export default connectDB;