import { NextRequest, NextResponse } from "next/server";

export type Middleware = (
  req: NextRequest,
  res?: NextResponse<unknown>,
  next?: Middleware
) => Promise<NextResponse<unknown>>;
