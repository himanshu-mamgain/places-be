import { Request, Response, NextFunction } from "express";
import ResponseService from "../../utils/response.handler";
import {
  ICreatePlace,
  IPlaceController,
  IUpdatePlace,
} from "./place.interface";
import placeService from "./palce.service";
import { IGetRequestUser } from "../../utils/interface";

class PlaceController extends ResponseService implements IPlaceController {
  constructor(private readonly service = placeService) {
    super();
  }

  createPlace = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: ICreatePlace = req.payload;
      const user: IGetRequestUser = req.user!;
      const image: Express.Multer.File | undefined = req.file;

      const { statusCode, payload, message } = await this.service.createPlace(
        data,
        user.id,
        image
      );

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  getPlaceById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { placeId } = req.payload;

      const { statusCode, payload, message } = await this.service.getPlaceById(
        placeId
      );

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  getPlacesByUserId = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { userId } = req.payload;

      const { statusCode, payload, message } =
        await this.service.getPlacesByUserId(userId);

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  updatePlace = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: IUpdatePlace = req.payload;

      const { statusCode, payload, message } = await this.service.updatePlace(
        data
      );
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  deletePlace = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { placeId } = req.payload;

      const { statusCode, payload, message } = await this.service.deletePlace(
        placeId
      );

      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const placeController = new PlaceController();
export default placeController;
