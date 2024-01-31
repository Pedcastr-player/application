import { ExternalFeedController } from "@/api/modules/externalFeed";
import { handler, withErrorHandler } from "@/api/middlewares";
import { NextRequest } from "@/types";

const externalFeedController = new ExternalFeedController();

async function getFeedSummary(req: NextRequest) {
  return await externalFeedController.getFeedSummary(req);
}

export const POST = handler(withErrorHandler, getFeedSummary);
