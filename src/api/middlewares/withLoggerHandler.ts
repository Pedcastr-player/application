import { NextResponse } from "next/server";

import { rootLogger } from "@/globals/Logger";
import { Middleware, NextRequest } from "@/types";

export default async function withLoggerHandler(
  req: NextRequest,
  res?: NextResponse,
  next?: Middleware
) {
  req.logger = rootLogger.child({
    name: `${req.method} ${req.nextUrl.pathname}`,
  });
  if (next) return await next(req, res);
  throw new Error(
    "You need to pass another method following withLoggerHandler"
  );
}
