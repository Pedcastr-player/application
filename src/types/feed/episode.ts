import { z } from "zod";
import {
  ITUNES,
  itunesImageSchema,
  itunesStringSchema,
} from "../itunes/properties";

export const episodeResponseSchema = z.object({
  title: itunesStringSchema,
  link: itunesStringSchema,
  [ITUNES.SUMMARY]: itunesStringSchema,
  [ITUNES.IMAGE]: itunesImageSchema,
  [ITUNES.DURATION]: itunesStringSchema,
  pubDate: itunesStringSchema,
  description: itunesStringSchema,
});

export type EpisodeResponse = z.infer<typeof episodeResponseSchema>;
