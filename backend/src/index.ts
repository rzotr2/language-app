import express from "express";
import cookieParser from 'cookie-parser';
import { connectDB } from "./config/db";
import authRouter from './routes/auth';
import usersRouter from './routes/users';
import aiRouter from './routes/ai';
import path from "node:path";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/ai', aiRouter);

app.use(express.static(path.join(process.cwd(), "assets")))

app.get('/*splat', (_req, res) => {
    res.sendFile(path.resolve(process.cwd(), "assets", "index.html"));
});

const connectToDB = async () => {
    await connectDB();
}

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
});
