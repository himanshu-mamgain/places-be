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

  createPlace = async (payload: ICreatePlace): Promise<IServiceResponse> => {
    const { title, description, address, creator } = payload;

    const corrdinates = await getCoordsFromAddress(address);

    const newPlace = new placeModel({
      title,
      description,
      address,
      location: corrdinates,
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
      creator,
    }).save();

    return this.serviceResponse(
      200,
      { palce: newPlace },
      "Place created successfully"
    );
  };

  getPlaceById = async (placeId: Types.ObjectId): Promise<IServiceResponse> => {
    const place = placeModel.findById({ id: placeId });

    if (!place) {
      throw new BadRequestError("Could not find a place for the provided id");
    }

    return this.serviceResponse(200, place, "Place fetched successfully");
  };

  getPlacesByUserId = async (
    userId: Types.ObjectId
  ): Promise<IServiceResponse> => {
    const userPlaces = await placeModel.find({
      creator: {
        id: userId,
      },
    });

    return this.serviceResponse(
      200,
      userPlaces,
      "User places fetched successfully"
    );
  };

  updatePlace = async (payload: IUpdatePlace): Promise<IServiceResponse> => {
    const { placeId, title, description } = payload;

    const placeExist = await placeModel.findOne({ id: placeId });

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

  deletePlace = async (placeId: Types.ObjectId): Promise<IServiceResponse> => {
    const placeExist = await placeModel.findOne({ id: placeId });

    if (placeExist) {
      await placeModel.deleteOne({ id: placeExist.id });

      return this.serviceResponse(200, {}, "Place deleted successfully");
    } else {
      throw new BadRequestError("Could not find a place with provided id");
    }
  };
}

const placeService = new PlaceService();
export default placeService;
