import { CustomApiError } from "./CustomApiError";

export class BadRequestError extends CustomApiError {
  statusCode = 400;
  constructor(message: string) {
    super(message);
  }
}
