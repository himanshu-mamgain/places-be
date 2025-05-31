import fs from "fs";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import { InternalServerError } from "./errors/InternalServerError";
import { ICloudinaryResponse } from "./interface";

const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } =
  process.env;

cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_API_KEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const uploadFileToCloudinary = async (
  filePath: string | undefined,
  options: any = {}
): Promise<ICloudinaryResponse | undefined> => {
  try {
    if (filePath) {
      const uploadRes: UploadApiResponse = await cloudinary.uploader.upload(
        filePath,
        options
      );

      if (uploadRes && uploadRes.secure_url && uploadRes.url) {
        // deleting file
        fs.unlink(filePath, (error) => {
          if (error) {
            throw new InternalServerError(error?.message);
          }
        });

        return {
          secureUrl: uploadRes.secure_url,
          url: uploadRes.url,
        };
      }
    }
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw error;
  }
};
