import { CustomApiError } from "./CustomApiError";

export class NotAuthorizedError extends CustomApiError {
  statusCode = 401;
  constructor(message: string) {
    super(message);
  }
}
