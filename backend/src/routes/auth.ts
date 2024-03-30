import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import { verifyToken } from '../middleware/auth';



const router = express.Router();


router.post('/login', [

    check("email", "Email is required").isEmail(),
    check("password", "password is required").isLength({ min: 6 })

], async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors.array() })
    }
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }

        // now create a token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
            expiresIn: "1d"
        });


        res.cookie("auth_token", token, {
            httpOnly: true,// only use in server
            secure: process.env.NODE_ENV === "production", // over https only in prod
            maxAge: 86400000  // cookie expiration === 1 day

        })

        return res.status(200).json({ userId: user._id });

    } catch (error) {

        res.status(500).json({ message: "Something went wrong" });
    }
})

router.get('/validate-token', verifyToken, async (req: Request, res: Response) => {
    return res.status(200).json({ userId: req.userId });
})

router.post('/logout', async (req: Request, res: Response) => {
    res.cookie("auth_token", "", {
        expires: new Date(0),
    })
    res.send()
})


export default router