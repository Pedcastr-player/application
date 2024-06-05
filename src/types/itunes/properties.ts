import { z } from "zod";

export enum ITUNES {
  AUTHOR = "itunes:author",
  CATEGORY = "itunes:category",
  DURATION = "itunes:duration",
  IMAGE = "itunes:image",
  SUBTITLE = "itunes:subtitle",
  SUMMARY = "itunes:summary",
}

export const itunesStringSchema = z.string().array();
export const itunesCategorySchema = z
  .object({
    $: z.object({
      text: z.string(),
    }),
  })
  .array();
export const itunesImageSchema = z
  .object({
    $: z.object({
      href: z.string(),
    }),
  })
  .array();
