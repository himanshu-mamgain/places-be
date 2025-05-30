import userModel from "../../models/user.model";
import { uploadFileToCloudinary } from "../../utils/cloudinary";
import { BadRequestError } from "../../utils/errors/BadRequestError";
import { generatePasswordHash, verifyPasswordHash } from "../../utils/hash";
import { IServiceResponse } from "../../utils/interface";
import { createToken } from "../../utils/jwt";
import ResponseService from "../../utils/response.handler";
import { ILoginUser, IRegisterUser, IUserService } from "./user.interface";

class UserService extends ResponseService implements IUserService {
  constructor() {
    super();
  }

  registerUser = async (
    payload: IRegisterUser,
    image: Express.Multer.File | undefined
  ) => {
    const { name, email, password } = payload;

    const userExists = await userModel.findOne({
      email,
    });

    if (!userExists) {
      const hashedPassword = await generatePasswordHash(password);

      const uploadRes = await uploadFileToCloudinary(image?.path);

      const user = await new userModel({
        name,
        email,
        password: hashedPassword,
        image: uploadRes?.secureUrl,
      }).save();

      return this.serviceResponse(200, user, "User registered successfully");
    } else {
      throw new BadRequestError("User already exists!");
    }
  };

  loginUser = async (payload: ILoginUser) => {
    const { email, password } = payload;

    const userExist = await userModel.findOne({ email });

    if (userExist) {
      const passwordMatch = await verifyPasswordHash(
        password,
        userExist.password
      );

      if (passwordMatch) {
        const token = createToken(
          {
            id: userExist._id,
            name: userExist.name,
            email: userExist.email,
          },
          { expiresIn: "1h" }
        );

        return this.serviceResponse(
          200,
          { token, userId: userExist._id },
          "User logged in successfully"
        );
      } else {
        throw new BadRequestError("Incorrect password");
      }
    } else {
      throw new BadRequestError("User not exist!");
    }
  };

  getAllUsers = async (): Promise<IServiceResponse> => {
    const users = await userModel.find({});

    return this.serviceResponse(
      200,
      users,
      "Users places fetched successfully"
    );
  };
}

const userService = new UserService();
export default userService;
