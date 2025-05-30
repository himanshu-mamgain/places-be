import * as jwt from "jsonwebtoken";
import { Types } from "mongoose";

declare module "jsonwebtoken" {
  export interface IJwtPayload extends jwt.JwtPayload {
    id: string;
    name: string;
    email: string;
  }
}
