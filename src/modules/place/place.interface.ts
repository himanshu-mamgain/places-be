import { Types } from "mongoose";
import { IServiceResponse } from "../../utils/interface";

export interface IPlaceService {
  createPlace(payload: ICreatePlace): Promise<IServiceResponse>;
  getPlaceById(placeId: Types.ObjectId): Promise<IServiceResponse>;
  getPlacesByUserId(userId: Types.ObjectId): Promise<IServiceResponse>;
  updatePlace(payload: IUpdatePlace): Promise<IServiceResponse>;
  deletePlace(placeId: Types.ObjectId): Promise<IServiceResponse>;
}

export interface ICreatePlace {
  title: string;
  description: string;
  address: string;
  creator: Types.ObjectId;
}

export interface IUpdatePlace {
    placeId: Types.ObjectId,
    title: string;
    description: string;
}