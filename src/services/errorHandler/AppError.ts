import { ErrorCode, ErrorPayload } from "@/types";

class AppError extends Error {
  readonly message: string;
  readonly status: number;
  readonly error: ErrorCode;

  constructor({
    message = "Something went wrong",
    status = 500,
    error = "ERR_UNKNOWN",
  }: ErrorPayload) {
    super();
    this.message = message;
    this.status = status;
    this.error = error;
  }
}

export default AppError;
