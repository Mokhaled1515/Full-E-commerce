import { Router } from "express";
import auth from "../middlewere/auth.js";
import uploadImageController from "../controllers/uploadImageController.js";
import upload from "../middlewere/multer.js";

const uploadRouter = Router();

uploadRouter.post("/upload", auth,upload.single("image"),uploadImageController)


export default uploadRouter