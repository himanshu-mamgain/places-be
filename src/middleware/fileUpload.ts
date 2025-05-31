import { NextFunction, Request, Response } from "express";
import multer from "multer";
import path from "path";

// Configure storage
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "uploads/images"); // make sure this folder exists
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter (accept only images)
const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage, fileFilter });

export default function fileUpload() {
  return function (
    req: Request,
    res: Response,
    next: NextFunction
  ): void {
    upload.single("image")(req, res, (err: any) => {
      if (err instanceof multer.MulterError) {
        return next(new Error(`Multer Error: ${err.message}`));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
}
