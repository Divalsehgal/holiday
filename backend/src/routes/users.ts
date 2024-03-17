import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken"

const router = express.Router();


//register routes
router.get('/register', async function (req: Request, res: Response) {

    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ message: "User already Exists" });
        }
        user = new User(req.body);
        await user.save();
        // now create a token
        const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        });


        res.cookie("auth_token", token, {
            httpOnly: true,// only use in server
            secure: process.env.NODE_ENV === "production", // over https only in prod
            maxAge: 864 // cookie expiration === 1 day

        })
        
        return res.status(200).json({ message: "User Register Successfully" });

    } catch (error) {

        res.status(500).json({ message: "Something went wrong" });
    }

})

export default router