export type ErrorCode = "ERR_UNKNOWN" | "ERR_INVALID_URL";

export type ErrorPayload = {
  message?: string;
  status?: number;
  error?: ErrorCode;
};
