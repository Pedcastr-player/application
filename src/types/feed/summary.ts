import { z } from "zod";

const feedSummarySchema = z.object({
  author: z.string(),
  category: z.string(),
  email: z.string(),
  image: z.string(),
  language: z.string(),
  lastPublishedAt: z.string(),
  summary: z.string(),
  title: z.string(),
  url: z.string(),
});

export type FeedSummary = z.infer<typeof feedSummarySchema>;

export function isFeedSummary(object: unknown): object is FeedSummary {
  return !!feedSummarySchema.safeParse(object).success;
}
