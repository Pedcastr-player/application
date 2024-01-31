import { NextResponse } from "next/server";

import { AppError, getErrorResponse } from "@/globals/errorHandlers";
import { rootLogger } from "@/globals/Logger";
import { AppErrorProps, Middleware, NextRequest } from "@/types";

export default async function withErrorHandler(
  req: NextRequest,
  res?: NextResponse,
  next?: Middleware
) {
  req.logger = rootLogger.child({
    name: `${req.method} ${req.nextUrl.pathname}`,
  });

  try {
    if (next) return await next(req, res);
    throw new AppError(
      "You need to pass another method following withErrorHandler"
    );
  } catch (e) {
    const error = e as AppErrorProps;
    req.logger.error({
      code: error.name,
      status: error.status,
      message: error.message,
    });
    return getErrorResponse(e);
  }
}
