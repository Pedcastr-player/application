import Xml2js from "xml2js";

import { AppError } from "@/globals/errorHandlers";
import { ErrorCodeEnum } from "@/types";

const xmlParser = new Xml2js.Parser({
  includeWhiteChars: true,
});

export default class ParserService {
  static async parseXml(response: Response) {
    const serviceError = "Invalid character in entity name";

    try {
      const content = await response.text();
      const data = await xmlParser.parseStringPromise(content);
      return data.rss.channel[0];
    } catch (e) {
      const error = e as Error;
      const hasInvalidCharacterError = error.message.includes(serviceError);
      const errorMessage = hasInvalidCharacterError ? `: ${serviceError}` : "";

      if (e instanceof TypeError || hasInvalidCharacterError) {
        throw new AppError({
          name: ErrorCodeEnum.enum.ERR_INVALID_URL,
          message: `Failed to parse URL${errorMessage}`,
          status: 400,
        });
      }
      throw new AppError(e);
    }
  }
}
