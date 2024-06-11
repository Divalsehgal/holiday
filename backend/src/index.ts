import express, { Request, Response } from "express";
import cors from "cors"
import "dotenv/config"
import mongoose from "mongoose"
import userRoutes from "./routes/users"
import authRoutes from "./routes/auth"

import myHotelRoutes from "./routes/my-hotel"
import cookieParser from "cookie-parser"
import path from "path";
import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
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

app.use(express.static(path.join(__dirname, "../../frontend/dist")))

app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: 'text' });
}); // test API

// connect the auth routes
app.use("/api/auth", authRoutes);

// connect the user routes
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);

app.get("*", (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, "../../frontend/dist/index.html")); 
})

app.listen(4000, () => {
    console.log("server running in 4000");
});
