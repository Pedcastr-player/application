import { z } from "zod";
import { ITUNES, itunesImageSchema } from "../itunes/properties";
import { episodeResponseSchema } from ".";

const feedResponseSchema = z.object({
  [ITUNES.SUBTITLE]: z.string().array(),
  [ITUNES.SUMMARY]: z.string().array(),
  [ITUNES.IMAGE]: itunesImageSchema,
  item: episodeResponseSchema.array(),
});

export type FeedResponse = z.infer<typeof feedResponseSchema>;

export function isFeedResponse(object: unknown): object is FeedResponse {
  return !!feedResponseSchema.safeParse(object).success;
}
