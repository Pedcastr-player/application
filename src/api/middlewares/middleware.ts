import { NextRequest, NextResponse } from "next/server";

import { Middleware } from "@/types/middleware";

export const handler =
  (...middleware: Middleware[]) =>
  async (req: NextRequest, res: NextResponse) => {
    let result;
    for (let i = 0; i < middleware.length; i++) {
      let nextInvoked = false;
      const next = async () => {
        nextInvoked = true;
      };
      result = await middleware[i](req, res, next);
      if (!nextInvoked) {
        break;
      }
    }
    if (result) return result;
    throw new Error("Your handler or middleware must return a NextResponse!");
  };
