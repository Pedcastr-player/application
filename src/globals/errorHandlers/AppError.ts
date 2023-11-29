import { ErrorCode, AppErrorProps, isAppErrorProps } from "@/types";

class AppError implements AppErrorProps {
  readonly name?: ErrorCode;
  readonly message?: string;
  readonly status?: number;

  constructor(error?: unknown) {
    if (isAppErrorProps(error)) {
      this.message = error.message;
      this.name = error.name;
      this.status = error.status;
    } else {
      this.name = "ERR_UNKNOWN";
      this.message = "Something went wrong";
      this.status = 500;
    }
  }
}

export default AppError;
