import { Request, Response, NextFunction } from "express";
import { IServiceResponse } from "../../utils/interface";

export interface IUserService {
  registerUser(
    payload: IRegisterUser,
    image: Express.Multer.File | undefined
  ): Promise<IServiceResponse>;
  loginUser(payload: ILoginUser): Promise<IServiceResponse>;
  getAllUsers(): Promise<IServiceResponse>;
}

export interface IUserController {
  registerUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  loginUser(req: Request, res: Response, next: NextFunction): Promise<void>;
  getAllUsers(req: Request, res: Response, next: NextFunction): Promise<void>;
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
