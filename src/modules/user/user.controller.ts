import { Request, Response, NextFunction } from "express";
import ResponseService from "../../utils/response.handler";
import { ILoginUser, IRegisterUser, IUserController } from "./user.interface";
import userService from "./user.service";

class UserController extends ResponseService implements IUserController {
  constructor(private readonly service = userService) {
    super();
  }

  registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: IRegisterUser = req.payload;
      const image: Express.Multer.File | undefined = req.file;
      
      const { message, payload, statusCode } = await this.service.registerUser(
        data,
        image
      );
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const data: ILoginUser = req.payload;

      const { message, payload, statusCode } = await this.service.loginUser(
        data
      );
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };

  getAllUsers = async (
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { message, payload, statusCode } =
        await this.service.getAllUsers();
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const userController = new UserController();
export default userController;
