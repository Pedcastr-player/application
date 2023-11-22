import { AppError, handleError } from "@/services/errorHandler";
import { NextRequest, NextResponse } from "next/server";

const xml2js = require("xml2js");

const parser = new xml2js.Parser({
  includeWhiteChars: true,
});

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { url } = await req.json();

    const regex = /feed/i;

    if (!regex.test(url)) {
      throw new AppError({
        error: "ERR_INVALID_URL",
        message: "A valid URL should have a feed endpoint",
        status: 400,
      });
    }

    const response = await fetch(url);
    const content = await response.text();

    const data = await parser.parseStringPromise(content);

    const feed = data.rss.channel[0];

    const payload = {
      title: feed["itunes:subtitle"][0],
      summary: feed["itunes:summary"][0],
      cover: feed["itunes:image"][0]["$"].href,
    };

    return NextResponse.json(payload);
  } catch (e) {
    if (e instanceof TypeError) {
      return handleError(e, {
        error: "ERR_INVALID_URL",
        message: "Failed to parse URL",
        status: 400,
      });
    }
    if (e instanceof AppError) {
      return handleError(e);
    }
  }
}
