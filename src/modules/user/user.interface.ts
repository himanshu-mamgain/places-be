import { Request, Response, NextFunction } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IUserService {
  getAllUsers(): Promise<IServiceResponse>;
}

export interface IUserController {
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
}
