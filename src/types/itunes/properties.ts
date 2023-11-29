import { z } from "zod";

export enum ITUNES {
  SUBTITLE = "itunes:subtitle",
  SUMMARY = "itunes:summary",
  IMAGE = "itunes:image",
  DURATION = "itunes:duration",
}

export const itunesStringSchema = z.string().array();
export const itunesImageSchema = z
  .object({
    $: z.object({
      href: z.string(),
    }),
  })
  .array();
