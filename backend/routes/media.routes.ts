import express from "express";
import {
    deleteImage,
    getImageFile,
    getUserImage,
    uploadMultiplyImage,
    uploadSingleImage,
} from "../controllers/media.controller.js";
import {upload} from "../middleware/multer.js";
import {isAuth} from "../middleware/isAuth.js";

const mediaRouter = express.Router();

mediaRouter.post(
    "/upload/single",
    isAuth,  // middleware
    upload.single("image"),
    uploadSingleImage,
);

mediaRouter.post("/upload/multiple", isAuth, upload.array("images",20), uploadMultiplyImage);

mediaRouter.get("/", isAuth, getUserImage);
mediaRouter.get("/:id/file", isAuth,getImageFile);
mediaRouter.get("/:id", isAuth, deleteImage);

export default mediaRouter;