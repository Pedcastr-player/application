import { NextResponse } from "next/server";

import { NextRequest } from "@/types";
import { ExternalFeedService } from ".";

export default class ExternalFeedController {
  feedsService = new ExternalFeedService();

  public async getFeedSummary(req: NextRequest) {
    req.logger.info("getFeedSummary");
    const { url } = await req.json();

    const payload = await this.feedsService.getFeedSummary(url);

    return NextResponse.json(payload);
  }
}
