import { Types } from "mongoose";
import placeModel from "../../models/place.model";
import { IServiceResponse } from "../../utils/interface";
import { getCoordsFromAddress } from "../../utils/location";
import ResponseService from "../../utils/response.handler";
import { ICreatePlace, IPlaceService, IUpdatePlace } from "./place.interface";
import { BadRequestError } from "../../utils/errors/BadRequestError";

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

    const corrdinates = await getCoordsFromAddress(address);

    const newPlace = await new placeModel({
      title,
      description,
      address,
      location: corrdinates,
      imageUrl: image?.path,
      creator: new Types.ObjectId(creatorId),
    }).save();

    return this.serviceResponse(
      200,
      { palce: newPlace },
      "Place created successfully"
    );
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

  updatePlace = async (payload: IUpdatePlace): Promise<IServiceResponse> => {
    const { placeId, title, description } = payload;

    const placeExist = await placeModel.findOne({
      _id: new Types.ObjectId(placeId),
    });

    if (placeExist) {
      await placeModel.updateOne({
        title,
        description,
      });

      return this.serviceResponse(200, {}, "Place updated successfully");
    } else {
      throw new BadRequestError("Could not find a place with provided id");
    }
  };

  deletePlace = async (placeId: string): Promise<IServiceResponse> => {
    const placeExist = await placeModel.findOne({
      _id: new Types.ObjectId(placeId),
    });

    if (placeExist) {
      await placeModel.deleteOne({ _id: new Types.ObjectId(placeId) });

      return this.serviceResponse(200, {}, "Place deleted successfully");
    } else {
      throw new BadRequestError("Could not find a place with provided id");
    }
  };
}

const placeService = new PlaceService();
export default placeService;
