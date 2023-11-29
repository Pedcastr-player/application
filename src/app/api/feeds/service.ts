import Xml2js from "xml2js";
import { AppError } from "@/globals/errorHandlers";
import ItunesService from "@/services/itunes";
import { FeedSummary, isFeedResponse } from "@/types";

const xmlParser = new Xml2js.Parser({
  includeWhiteChars: true,
});

export default class FeedsService {
  itunesService = new ItunesService();

  private async parseXml(response: Response) {
    try {
      const content = await response.text();
      const data = await xmlParser.parseStringPromise(content);
      return data.rss.channel[0];
    } catch (e) {
      if (e instanceof TypeError) {
        throw new AppError({
          name: "ERR_INVALID_URL",
          message: "Failed to parse URL",
          status: 400,
        });
      }
      throw new AppError(e);
    }
  }

  private async validateUrl(url: string) {
    const regex = /feed/i;

    if (!regex.test(url)) {
      throw new AppError({
        name: "ERR_INVALID_URL",
        message: "A valid URL should have a feed on its address",
        status: 400,
      });
    }
  }

  private async getFeed(url: string): Promise<FeedSummary | undefined> {
    try {
      this.validateUrl(url);

      const response = await fetch(url);

      const feed = await this.parseXml(response);

      return feed;
    } catch (e) {
      throw new AppError(e);
    }
  }

  public async getFeedSummary(url: string) {
    try {
      const feed = await this.getFeed(url);

      if (isFeedResponse(feed)) {
        return this.itunesService.getSummary(feed);
      }

      throw new AppError({
        name: "ERR_INVALID_URL",
        message: "This URL is not from a podcast feed",
        status: 400,
      });
    } catch (e) {
      throw new AppError(e);
    }
  }
}
