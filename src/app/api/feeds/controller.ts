import { NextRequest, NextResponse } from "next/server";

import { getErrorResponse } from "@/globals/errorHandlers";
import FeedsService from "./service";

export default class FeedsController {
  feedsService = new FeedsService();

  public async getFeedSummary(req: NextRequest) {
    try {
      const { url } = await req.json();

      const payload = await this.feedsService.getFeedSummary(url);

      return NextResponse.json(payload);
    } catch (e) {
      return getErrorResponse(e);
    }
  }
}
