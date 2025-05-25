import { CustomApiError } from "./CustomApiError";

export class InternalServerError extends CustomApiError {
  statusCode = 500;
  constructor(message: string) {
    super(message);
  }
}
