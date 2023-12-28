import { AppError } from "@/globals/errorHandlers";
import { ErrorCodeEnum, FeedResponse, isFeedResponse } from "@/types";
import { ITunesService } from "../iTunes";
import ParserService from "../parser/service";

export default class ExternalFeedService {
  itunesService = new ITunesService();
  parserService = new ParserService();

  private async validateUrl(url: string) {
    const regex = /feed/i;

    if (!regex.test(url)) {
      throw new AppError({
        name: ErrorCodeEnum.enum.ERR_INVALID_URL,
        message: "A valid URL should have a feed on its address",
        status: 400,
      });
    }
  }

  public async getFeed(url: string): Promise<FeedResponse> {
    await this.validateUrl(url);
    const response = await fetch(url);

    const feed = await this.parserService.parseXml(response);
    if (isFeedResponse(feed)) {
      return feed;
    }

    throw new AppError({
      name: ErrorCodeEnum.enum.ERR_INVALID_URL,
      message: "This URL is not from a podcast feed",
      status: 400,
    });
  }

  public async getFeedSummary(url: string) {
    const feed = await this.getFeed(url);

    return this.itunesService.getSummary(feed);
  }
}
