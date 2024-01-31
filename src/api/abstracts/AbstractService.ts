import { Logger } from "pino";

export default abstract class AbstractService {
  logger: Logger<never>;

  constructor(logger: Logger) {
    this.logger = logger;
  }
}
