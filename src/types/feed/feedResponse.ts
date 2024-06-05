import { z } from "zod";
import {
  ITUNES,
  itunesCategorySchema,
  itunesImageSchema,
  itunesStringSchema,
} from "../itunes/properties";
import { episodeResponseSchema } from ".";

const feedResponseSchema = z.object({
  [ITUNES.AUTHOR]: itunesStringSchema,
  [ITUNES.CATEGORY]: itunesCategorySchema,
  [ITUNES.IMAGE]: itunesImageSchema,
  [ITUNES.SUBTITLE]: itunesStringSchema,
  [ITUNES.SUMMARY]: itunesStringSchema,
  managingEditor: itunesStringSchema,
  item: episodeResponseSchema.array(),
  language: itunesStringSchema,
  lastBuildDate: itunesStringSchema,
});

export type FeedResponse = z.infer<typeof feedResponseSchema>;

export function isFeedResponse(object: unknown): object is FeedResponse {
  return !!feedResponseSchema.safeParse(object).success;
}
