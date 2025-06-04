import mongoose from 'mongoose';
import dotenv from "dotenv";

dotenv.config();

const uri: string = process.env.MONGODB_URI!;
if (!uri) {
    throw new Error("Missing MONGODB_URI in .env");
}

export async function connectDB(): Promise<void> {
    try {
        await mongoose.connect(uri);
        console.log("✅ MongoDB connected");
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        process.exit(1);
    }
}
