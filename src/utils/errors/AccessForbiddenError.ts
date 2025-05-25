import { CustomApiError } from "./CustomApiError";

export class AccessForbiddenError extends CustomApiError {
  statusCode = 403;
  constructor(message: string) {
    super(message);
  }
}
