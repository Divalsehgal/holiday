import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config"
import mongoose from "mongoose";
import userRoutes from "./routes/users"
// mongo db connected
mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING as string)

const app = express();
app.use(express.json()) // help to convert json body to json autmatically
app.use(express.urlencoded({ extended: true })); // helps in parse url
app.use(cors());




app.get('/api/test', async (req: Request, res: Response) => {
    res.json({ message: 'text' });
}); // test API


// conect the routes
app.use("/api/users", userRoutes);

app.listen(4000, () => {
    console.log("server running in 4000")
});
