import { NextFunction, Request, Response } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IPlaceService {
  createPlace(
    payload: ICreatePlace,
    creatorId: string,
    image: Express.Multer.File | undefined
  ): Promise<IServiceResponse>;
  getPlaceById(placeId: string): Promise<IServiceResponse>;
  getPlacesByUserId(userId: string): Promise<IServiceResponse>;
  updatePlace(payload: IUpdatePlace): Promise<IServiceResponse>;
  deletePlace(placeId: string): Promise<IServiceResponse>;
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
}

export interface IUpdatePlace {
  placeId: string;
  title: string;
  description: string;
}
