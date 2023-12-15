import { z } from "zod";

export const ErrorCodeEnum = z.enum(["ERR_UNKNOWN", "ERR_INVALID_URL"]);
export type ErrorCode = z.infer<typeof ErrorCodeEnum>;

const appErrorSchema = z.object({
  name: ErrorCodeEnum.optional(),
  message: z.string().optional(),
  status: z.number().optional(),
});

export type AppErrorProps = z.infer<typeof appErrorSchema>;

export function isAppErrorProps(object: unknown): object is AppErrorProps {
  return !!appErrorSchema.safeParse(object).success;
}
