import { Types } from "mongoose";
import { NextFunction, Request, Response } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IPlaceService {
  createPlace(payload: ICreatePlace): Promise<IServiceResponse>;
  getPlaceById(placeId: Types.ObjectId): Promise<IServiceResponse>;
  getPlacesByUserId(userId: Types.ObjectId): Promise<IServiceResponse>;
  updatePlace(payload: IUpdatePlace): Promise<IServiceResponse>;
  deletePlace(placeId: Types.ObjectId): Promise<IServiceResponse>;
}

export interface IPlaceController {
  createPlace(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPlaceById(req: Request, res: Response, next: NextFunction): Promise<void>;
  getPlacesByUserId(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void>;
  updatePlace(req: Request, res: Response, next: NextFunction): Promise<void>;
  deletePlace(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface ICreatePlace {
  title: string;
  description: string;
  address: string;
  creator: Types.ObjectId;
}

export interface IUpdatePlace {
  placeId: Types.ObjectId;
  title: string;
  description: string;
}
