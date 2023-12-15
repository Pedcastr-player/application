import { NextRequest, NextResponse } from "next/server";

import { ExternalFeedService } from ".";

export default class ExternalFeedController {
  feedsService = new ExternalFeedService();

  public async getFeedSummary(req: NextRequest) {
    const { url } = await req.json();

    const payload = await this.feedsService.getFeedSummary(url);

    return NextResponse.json(payload);
  }
}
