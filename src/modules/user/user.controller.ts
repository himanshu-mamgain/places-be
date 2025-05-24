import { Request, Response, NextFunction } from "express";
import ResponseService from "../../utils/response.handler";
import { IUserController } from "./user.interface";
import userService from "./user.service";

class UserController extends ResponseService implements IUserController {
  constructor(private readonly service = userService) {
    super();
  }

  getAllUsers = async (
    _: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { message, payload, statusCode } = await this.service.getAllUsers();
      this.sendResponse(res, statusCode, payload, message);
    } catch (error) {
      next(error);
    }
  };
}

const userController = new UserController();
export default userController;
