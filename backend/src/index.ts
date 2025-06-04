import express, { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import cors from 'cors';
import { connectDB } from "./config/db";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173', // або '*' для всіх
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json());
app.use("/api", userRoutes);

app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to the Node.js + TypeScript API!");
});

const connectToDB = async () => {
    await connectDB();
}

app.listen(PORT, () => {
    connectToDB();
    console.log(`Server is running on port ${PORT}`);
});
