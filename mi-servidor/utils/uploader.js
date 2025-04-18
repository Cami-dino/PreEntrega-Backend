import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/img"),
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});

export const uploader = multer({ storage });
