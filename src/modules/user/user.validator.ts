import Joi, { ObjectSchema } from "joi";
import { ILoginUser, IRegisterUser } from "./user.interface";

export const registerUserSchema: ObjectSchema<IRegisterUser> =
  Joi.object<IRegisterUser>({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  });

export const loginUserSchema: ObjectSchema<ILoginUser> = Joi.object<ILoginUser>(
  {
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
  }
);
