import { FeedResponse, FeedSummary, ITUNES } from "@/types";

export default class ITunesService {
  static getSummary(feed: FeedResponse): FeedSummary {
    return {
      title: feed[ITUNES.SUBTITLE][0],
      summary: feed[ITUNES.SUMMARY][0],
      cover: feed[ITUNES.IMAGE][0]["$"].href,
    };
  }
}
