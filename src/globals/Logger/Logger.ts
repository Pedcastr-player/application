import pino from "pino";
import pretty from "pino-pretty";

const stream = pretty({
  colorize: true,
  ignore: "hostname,pid",
});

const rootLogger = pino(
  {
    name: "Logger",
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
  },
  stream
);

export default rootLogger;
