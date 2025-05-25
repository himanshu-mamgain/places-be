import { Request, Response, NextFunction } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IUserService {
  registerUser(payload: IRegisterUser): Promise<IServiceResponse>;
  loginUser(payload: ILoginUser): Promise<IServiceResponse>;
  getAllUsersPlaces(): Promise<IServiceResponse>;
}

export interface IUserController {
  getAllUsersPlaces(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface IRegisterUser {
  name: string;
  email: string;
  password: string;
}

export interface ILoginUser {
  email: string;
  password: string;
}