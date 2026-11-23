import fs from "node:fs";
import {fileURLToPath} from "node:url";
import path from "node:path";
import crypto from "crypto";

import multer from "multer";
import { allowedNodeEnvironmentFlags } from "node:process";

/*
1. Create the uploads folder if it doesn't exist.
   Git doesn't track empty folders, so we create it when needed.

2. Configure Multer:
   - storage   → where and how to save the uploaded file
   - fileFilter → which files are allowed

3. diskStorage has two methods:
   - destination → decides where the file is stored
   - filename    → decides what name the file gets

4. Both destination and filename receive:
   req, file, cb                                                                              
   - req  → request
   - file → uploaded file information
   - cb   → callback used to tell Multer what to do

5. fileFilter checks the uploaded file.
   Here, we only allow PDF files based on their MIME type.
*/

// 1.create the uploads folder if it doesn't exist

const currentFile =  fileURLToPath(import.meta.url);
const currentDirectory =  path.dirname(currentFile);

export const uploadPath = path.resolve(
   currentDirectory,
   "../UploadMedisLocalStorage",
);

fs.mkdirSync(uploadPath,{recursive: true});

const allowedMimeType = ["image/jpeg","image/png", "image/webp"];
const mimeExtensions: Record<string, string> ={
   "image/jpef": ".jpg",
   "image/png": ".png",
    "image/web": ".webp",
};

// 2.config Multer: storage, fileFilter

const storage = multer.diskStorage({
   destination:(_req, file, cb)=>{
      cb(null, uploadPath);
   },

   filename:(_req, file, cb) => {
      const extension = mimeExtensions[file.mimetype];
       cb(null, ` ${crypto.randomUUID()} ${extension}`);
   },
});
/*
Why use UUID filenames?
Instead of saving a file as wedding-photo.jpg, we save it with a random name, such as: 

UploadMediaLocalStorage/
├── 2d1c...a81.jpg
├── 7f3b...c92.png
└── 9a4e...b11.webp

This avoids filename collisions and prevents users from choosing storage filenames.
 */

const fileFilter: multer.Options["fileFilter"] =(_req, file, cb) =>{
   if(allowedMimeType.includes(file.mimetype)){
      cb(null, true);
   }else{
      cb(new Error("Only JPG, JPEG, PNG and WEBP image are allowed."));
   }
};

export const upload = multer({
   storage,
   fileFilter,
   limits: {
      fileSize: 20 * 1024 * 1024, // 20 MB per image
      files: 20, // Maximum 20 images per request
   
   },
});
