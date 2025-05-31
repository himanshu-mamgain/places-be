import jwt from "jsonwebtoken";
import { ICreateToken } from "./interface";
import { PreconditionError } from "./errors/PreconditionError";

const { JWT_SECRET } = process.env;

export const createToken = (
  payload: ICreateToken,
  options?: jwt.SignOptions
) => {
  if (JWT_SECRET) {
    return jwt.sign(payload, JWT_SECRET, options);
  }

  throw new PreconditionError("JWT_SECRET is missing");
};
