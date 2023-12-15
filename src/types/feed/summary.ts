import { z } from "zod";

const feedSummarySchema = z.object({
  title: z.string(),
  summary: z.string(),
  cover: z.string(),
});

export type FeedSummary = z.infer<typeof feedSummarySchema>;

export function isFeedSummary(object: unknown): object is FeedSummary {
  return !!feedSummarySchema.safeParse(object).success;
}
