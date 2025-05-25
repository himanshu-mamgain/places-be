import { NextFunction, Request, Response } from "express";
import { NotAuthorizedError } from "../utils/errors/NotAuthorizedError";
import verifyJwt from "../utils/verifyJwt";
import userModel from "../models/user.model";
import { AccessForbiddenError } from "../utils/errors/AccessForbiddenError";

export default function authorizer() {
  return async function (
    req: Request,
    _res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const bearerToken = req.headers["authorization"];

      if (!bearerToken) {
        throw new NotAuthorizedError("Missing header");
      }
      if (!bearerToken.startsWith("Bearer ")) {
        throw new NotAuthorizedError("Missing header");
      }

      const tokenValue = bearerToken.split(" ")[1];

      if (!tokenValue) {
        throw new NotAuthorizedError("Authorization token not found.");
      }

      const decodedData = verifyJwt(tokenValue);
      const { id, name, email } = decodedData;

      const user = await userModel.findOne({ id });

      if (!user) {
        throw new AccessForbiddenError("User not found");
      }

      req.user = { id, name, email };
      next();
    } catch (error) {
      next(error);
    }
  };
}
