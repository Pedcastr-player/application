import { AppError } from "@/globals/errorHandlers";
import { ErrorCodeEnum, FeedResponse, isFeedResponse } from "@/types";
import { ITunesService } from "../iTunes";
import ParserService from "../parser/service";

export default class ExternalFeedService {
  private async validateUrl(url: string) {
    const httpsString = "https://";
    const urlHasHttps = url.includes(httpsString);
    const formattedUrl = urlHasHttps ? url : httpsString + url;
    const httpsUrlRegex =
      /^(https:\/\/)([\da-zA-Z\.-]+)\.([a-zA-Z\.]{2,6})([\/\w\.-]*)*\/?$/;
    const feedRegex = /feed/i;

    if (!httpsUrlRegex.test(formattedUrl)) {
      throw new AppError({
        name: ErrorCodeEnum.enum.ERR_INVALID_URL,
        message: "This is not a valid URL address",
        status: 400,
      });
    }

    if (!feedRegex.test(formattedUrl)) {
      throw new AppError({
        name: ErrorCodeEnum.enum.ERR_INVALID_URL,
        message: "A valid URL should have a feed on its address",
        status: 400,
      });
    }

    return formattedUrl;
  }

  public async getFeed(url: string): Promise<FeedResponse> {
    const validatedUrl = await this.validateUrl(url);
    const response = await fetch(validatedUrl);

    const feed = await ParserService.parseXml(response);
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

    return ITunesService.getSummary(feed);
  }
}
