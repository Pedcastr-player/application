import { FeedSummaryProps } from "@/types/feed";

const xml2js = require("xml2js");

const parser = new xml2js.Parser({
  includeWhiteChars: true,
});

export async function POST(req: Request) {
  try {
    const { url } = await req.json();
    const response = await fetch(url);
    const content = await response.text();

    const data = await parser.parseStringPromise(content);

    const feed = data.rss.channel[0];

    const payload = {
      title: feed["itunes:subtitle"][0],
      summary: feed["itunes:summary"][0],
      cover: feed["itunes:image"][0]["$"].href,
    };

    return new Response(JSON.stringify(payload), {
      status: 200,
    });
  } catch (e) {
    console.error(e);
    return new Response("Error fetching the feed", { status: 500 });
  }
}
