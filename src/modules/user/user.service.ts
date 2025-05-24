import { IServiceResponse } from "../../utils/interface";
import ResponseService from "../../utils/response.handler";
import { IUserService } from "./user.interface";

class UserService extends ResponseService implements IUserService {
  constructor() {
    super();
  }

  getAllUsers = async (): Promise<IServiceResponse> => {
    return this.serviceResponse(200, {}, "");
  };
}

const userService = new UserService();
export default userService;
