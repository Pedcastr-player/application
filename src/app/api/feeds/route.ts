import { getErrorResponse } from "@/globals/errorHandlers";
import { NextRequest, NextResponse } from "next/server";
import FeedsController from "./controller";

const feedsController = new FeedsController();

export async function POST(req: NextRequest) {
  return await feedsController.getFeedSummary(req);
}
