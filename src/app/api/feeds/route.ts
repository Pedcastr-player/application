import { NextRequest } from "next/server";
import FeedsController from "./controller";
import { withErrorHandler } from "@/middlewares";

const feedsController = new FeedsController();

export async function POST(req: NextRequest) {
  async function getFeedSummary(req: NextRequest) {
    return await feedsController.getFeedSummary(req);
  }

  return withErrorHandler(req)(getFeedSummary);
}
