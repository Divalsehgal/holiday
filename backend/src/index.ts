import express, { Request, Response } from "express";
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"
import cookieParser from "cookie-parser"
// mongo db connected
async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

connectToMongoDB();
const app = express();
app.use(cookieParser())
app.use(express.json()) // help to convert json body to json automatically
app.use(express.urlencoded({ extended: true })); // helps in parse url

app.use(cors({
    origin: process.env.FRONT_END_URL,
    credentials: true
}));

app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: 'text' });
}); // test API

// connect the auth routes
app.use("/api/auth", authRoutes);

// connect the user routes
app.use("/api/users", userRoutes);

app.listen(4000, () => {
    console.log("server running in 4000");
});
