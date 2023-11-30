import { getErrorResponse } from "@/globals/errorHandlers";
import { NextRequest, NextResponse } from "next/server";

type Function = (
  req: NextRequest,
  res?: NextResponse
) => Promise<NextResponse<unknown>>;

export default function withErrorHandler(req: NextRequest, res?: NextResponse) {
  return async (callback: Function) => {
    try {
      return await callback(req, res);
    } catch (e) {
      return getErrorResponse(e);
    }
  };
}
