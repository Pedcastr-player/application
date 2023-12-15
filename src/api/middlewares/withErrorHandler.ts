import { getErrorResponse } from "@/globals/errorHandlers";

export default async function withErrorHandler(next: () => unknown) {
  try {
    await next();
  } catch (e) {
    return getErrorResponse(e);
  }
}
