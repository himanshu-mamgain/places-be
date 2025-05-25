import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { PreconditionError } from "../utils/errors/PreconditionError";

export default function validatePayload<T>(schema: ObjectSchema<T>) {
  return function (req: Request, _res: Response, next: NextFunction) {
    try {
      const data = {
        ...req.params,
        ...req.query,
        ...req.body,
      };

      const { error, value } = schema.validate(data);

      if (error) {
        throw new PreconditionError(error.message.replace(/\"/g, ""));
      }

      req.payload = value;
      next();
    } catch (error) {
      return next(error);
    }
  };
}
