import Xml2js from "xml2js";

import { AppError } from "@/globals/errorHandlers";
import { ErrorCodeEnum } from "@/types";

const xmlParser = new Xml2js.Parser({
  includeWhiteChars: true,
});

export default class ParserService {
  async parseXml(response: Response) {
    try {
      const content = await response.text();
      const data = await xmlParser.parseStringPromise(content);
      return data.rss.channel[0];
    } catch (e) {
      const error = e as Error;
      if (
        e instanceof TypeError ||
        error.cause === "Invalid character in entity name"
      ) {
        throw new AppError({
          name: ErrorCodeEnum.enum.ERR_INVALID_URL,
          message: "Failed to parse URL",
          status: 400,
        });
      }
      throw new AppError(e);
    }
  }
}
