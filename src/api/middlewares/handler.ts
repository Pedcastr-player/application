import { NextRequest, NextResponse } from "next/server";

import { Middleware } from "@/types/middleware";

export function handler(...middleware: Middleware[]) {
  return async (req: NextRequest, res: NextResponse) => {
    let result;
    for (let i = 0; i < middleware.length; i++) {
      result = await middleware[i](req, res, middleware[++i]);
    }
    return result;
  };
}
