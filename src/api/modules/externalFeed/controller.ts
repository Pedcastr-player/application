import { NextResponse } from "next/server";

import { NextRequest } from "@/types";
import { ExternalFeedService } from ".";

export default class ExternalFeedController {
  public async getFeedSummary(req: NextRequest) {
    const { url } = await req.json();

    const feedsService = new ExternalFeedService(req.logger);
    const payload = await feedsService.getFeedSummary(url);

    req.logger.info("Feed Summary retrieved!");
    return NextResponse.json(payload);
  }
}
