import { getErrorResponse } from "@/globals/errorHandlers";
import { Middleware } from "@/types/middleware";
import { NextRequest, NextResponse } from "next/server";

export default async function withErrorHandler(
  req: NextRequest,
  res?: NextResponse,
  next?: Middleware
) {
  try {
    if (next) return await next(req, res);
    throw new Error("You need to pass another method next to withErrorHandler");
  } catch (e) {
    return getErrorResponse(e);
  }
}
