import { NextRequest, NextResponse } from "next/server";

export type Middleware = (
  req: NextRequest,
  res: NextResponse<unknown>,
  next: () => Promise<void>
) => Promise<void | NextResponse<unknown>>;
