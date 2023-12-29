import { NextRequest as OriginalNextRequest } from "next/server";
import { Logger } from "pino";

export interface NextRequest extends OriginalNextRequest {
  logger: Logger;
}
