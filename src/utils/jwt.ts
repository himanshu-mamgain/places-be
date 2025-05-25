import jwt from "jsonwebtoken";
import { ICreateToken } from "./interface";
import { PreconditionError } from "./errors/PreconditionError";

const { JWT_SECRET_KEY } = process.env;

export const createToken = (payload: ICreateToken, maxAge: number) => {
  if (JWT_SECRET_KEY) {
    return jwt.sign(payload, JWT_SECRET_KEY, {
      expiresIn: maxAge * 24 * 60 * 60,
    });
  }

  throw new PreconditionError("JWT_SECRET_KEY is missing");
};
