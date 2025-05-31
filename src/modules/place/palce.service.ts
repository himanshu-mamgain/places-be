import { Types } from "mongoose";
import fs from "fs";
import placeModel from "../../models/place.model";
import { IServiceResponse } from "../../utils/interface";
import { getCoordsFromAddress } from "../../utils/location";
import ResponseService from "../../utils/response.handler";
import { ICreatePlace, IPlaceService, IUpdatePlace } from "./place.interface";
import { BadRequestError } from "../../utils/errors/BadRequestError";
import { NotAuthorizedError } from "../../utils/errors/NotAuthorizedError";
import userModel from "../../models/user.model";
import { uploadFileToCloudinary } from "../../utils/cloudinary";

class PlaceService extends ResponseService implements IPlaceService {
  constructor() {
    super();
  }

  createPlace = async (
    payload: ICreatePlace,
    creatorId: string,
    image: Express.Multer.File | undefined
  ): Promise<IServiceResponse> => {
    const { title, description, address } = payload;

    const creator = await userModel.findOne({
      _id: new Types.ObjectId(creatorId),
    });

    if (!creator) {
      throw new BadRequestError("User not found");
    } else {
      const corrdinates = await getCoordsFromAddress(address);

      const uploadRes = await uploadFileToCloudinary(image?.path);

      const newPlace = await new placeModel({
        title,
        description,
        address,
        location: corrdinates,
        imageUrl: uploadRes?.secureUrl,
        creator: new Types.ObjectId(creatorId),
      }).save();

      creator.places.push(newPlace._id);
      await creator.save();

      return this.serviceResponse(
        200,
        { place: newPlace },
        "Place created successfully"
      );
    }
  };

  getPlaceById = async (placeId: string): Promise<IServiceResponse> => {
    const place = await placeModel.findOne({
      _id: new Types.ObjectId(placeId),
    });

    if (!place) {
      throw new BadRequestError("Could not find a place for the provided id");
    }

    return this.serviceResponse(200, place, "Place fetched successfully");
  };

  getPlacesByUserId = async (userId: string): Promise<IServiceResponse> => {
    const userPlaces = await placeModel.find({
      creator: new Types.ObjectId(userId),
    });

    return this.serviceResponse(
      200,
      userPlaces,
      "User places fetched successfully"
    );
  };

  updatePlace = async (
    payload: IUpdatePlace,
    userId: string | undefined
  ): Promise<IServiceResponse> => {
    const { placeId, title, description } = payload;

    const placeExist = await placeModel.findOne({
      _id: new Types.ObjectId(placeId),
    });

    if (placeExist && userId) {
      if (placeExist.creator._id.toString() !== userId) {
        throw new NotAuthorizedError("You are not allowed to edit the place.");
      }

      await placeModel.updateOne({
        title,
        description,
      });

      return this.serviceResponse(200, {}, "Place updated successfully");
    } else {
      throw new BadRequestError("Could not find a place with provided id");
    }
  };

  deletePlace = async (
    placeId: string,
    userId: string | undefined
  ): Promise<IServiceResponse> => {
    const placeExist = await placeModel.findOne({
      _id: new Types.ObjectId(placeId),
    });

    if (placeExist && userId) {
      if (placeExist.creator._id.toString() !== userId) {
        throw new NotAuthorizedError(
          "You are not allowed to delete this place."
        );
      }

      await placeModel.deleteOne({ _id: new Types.ObjectId(placeId) });

      // Delete image
      fs.unlink(placeExist.imageUrl, (error) => {
        if (error) {
          console.error(error);
        }
      });

      return this.serviceResponse(200, {}, "Place deleted successfully");
    } else {
      throw new BadRequestError("Could not find a place with provided id");
    }
  };
}

const placeService = new PlaceService();
export default placeService;
