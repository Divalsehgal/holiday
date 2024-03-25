import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken"
import { check, validationResult } from 'express-validator';

const router = express.Router();


//register routes
router.post('/register',
    [check("firstName", "First name is required ").isString(),
    check("lastName", "Last name is required ").isString(),
    check("email", "Email is required ").isEmail(),
    check("password", "password with 6 or more characters required ").isLength({ min: 6 })], async function (req: Request, res: Response) {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() })
        }
        try {
            let user = await User.findOne({ email: req.body.email })
            if (user) {
                return res.status(400).json({ message: "User already Exists" });
            }
            user = new User(req.body);
            await user.save();
            // now create a token
            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY as string, {
                expiresIn: "1d"
            });


            res.cookie("auth_token", token, {
                httpOnly: true,// only use in server
                secure: process.env.NODE_ENV === "production", // over https only in prod
                maxAge: 86400000 // cookie expiration === 1 day

            })

            return res.status(200).send({ message: "User Register Successfully" });

        } catch (error) {

            res.status(500).send({ message: "Something went wrong" });
        }

    })

export default router