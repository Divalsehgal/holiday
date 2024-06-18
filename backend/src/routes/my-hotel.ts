import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { verifyToken } from '../middleware/auth';
import multer from "multer";
import cloudinary from "cloudinary"
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';
const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
})

router.post('/', verifyToken, [

    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City  is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel  Type is required"),
    body("pricePerNight").notEmpty().isNumeric().withMessage("Price per night is required and must be a number"),
    body("facilities").notEmpty().isArray().withMessage("Facilities are required"),

], upload.array("imageFiles", 6), async (req: Request, res: Response) => {

    try {
        const imageFiles = req.files as Express.Multer.File[];
        const newHotel: HotelType = await req.body
        //1. upload the image to cloudinary
        const uploadPromises = imageFiles.map(async (image) => {

            const b64 = Buffer.from(image.buffer).toString("base64");
            let dataURI = "data:" + image.mimetype + ";base64," + b64;
            const res = await cloudinary.v2.uploader.upload(dataURI);
            return res.url;
        })

        const imageUrls = await Promise.all(uploadPromises);

        //2. if successful upload then add urls to new hotel object
        newHotel.imageUrls = imageUrls;
        newHotel.lastUpdate = new Date();
        newHotel.userId = req.userId;


        //3 then save into database

        const hotel = new Hotel(newHotel)

        await hotel.save();

        return res.status(201).send(hotel);

    } catch (error) {
        console.log("Error Creating Hotel:", error)
        res.status(500).json({ message: "Something went wrong" });
    }
})

router.get('/', verifyToken, async (req: Request, res: Response) => {
    try {
        const hotels = await Hotel.find({ userId: req.userId })
        res.json(hotels);

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
})

export default router