import jwt from "jsonwebtoken";
import { ICreateToken } from "./interface";
import { PreconditionError } from "./errors/PreconditionError";

const { JWT_SECRET } = process.env;

export const createToken = (payload: ICreateToken, maxAge: number) => {
  if (JWT_SECRET) {
    return jwt.sign(payload, JWT_SECRET, {
      expiresIn: maxAge * 24 * 60 * 60,
    });
  }

  throw new PreconditionError("JWT_SECRET is missing");
};
