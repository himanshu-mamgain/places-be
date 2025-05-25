import { CustomApiError } from "./CustomApiError";

export class PreconditionError extends CustomApiError {
  statusCode = 412;
  constructor(message: string) {
    super(message);
  }
}
