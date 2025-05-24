import { CustomApiError } from "./CusotmApiError";

export class NotFoundError extends CustomApiError {
  statusCode = 404;
  constructor(message: string) {
    super(message);
  }
}
