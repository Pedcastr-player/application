import { NextResponse } from "next/server";
import { NextRequest } from "../next";

export type Middleware = (
  req: NextRequest,
  res?: NextResponse<unknown>,
  next?: Middleware
) => Promise<NextResponse<unknown>>;
