import { FeedResponse, FeedSummary, ITUNES } from "@/types";

export default class ITunesService {
  static getSummary(url: string, feed: FeedResponse): FeedSummary {
    return {
      author: feed[ITUNES.AUTHOR][0],
      category: feed[ITUNES.CATEGORY][0]["$"].text,
      email: feed.managingEditor[0],
      image: feed[ITUNES.IMAGE][0]["$"].href,
      language: feed.language[0],
      lastPublishedAt: feed.lastBuildDate[0],
      summary: feed[ITUNES.SUMMARY][0],
      title: feed[ITUNES.SUBTITLE][0],
      url,
    };
  }
}
