import { NextResponse } from "next/server";

import { getErrorResponse } from "@/globals/errorHandlers";
import { Middleware, NextRequest } from "@/types";

export default async function withErrorHandler(
  req: NextRequest,
  res?: NextResponse,
  next?: Middleware
) {
  try {
    if (next) return await next(req, res);
    throw new Error(
      "You need to pass another method following withErrorHandler"
    );
  } catch (e) {
    return getErrorResponse(e);
  }
}
