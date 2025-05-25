import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { NotAuthorizedError } from "./errors/NotAuthorizedError";

export default function verifyJwt(jwtToken: string): jwt.IJwtPayload {
  const SECRET: string = process.env.JWT_SECRET!;
  try {
    return <jwt.IJwtPayload>jwt.verify(jwtToken, SECRET);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      throw new NotAuthorizedError("Token expired!");
    } else if (error instanceof JsonWebTokenError) {
      throw new NotAuthorizedError("Invalid token value");
    }
    throw error;
  }
}
