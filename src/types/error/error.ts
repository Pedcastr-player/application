import { z } from "zod";

const errorCode = z.enum(["ERR_UNKNOWN", "ERR_INVALID_URL"]);
export type ErrorCode = z.infer<typeof errorCode>;

const appErrorSchema = z.object({
  name: errorCode.optional(),
  message: z.string().optional(),
  status: z.number().optional(),
});

export type AppErrorProps = z.infer<typeof appErrorSchema>;

export function isAppErrorProps(object: unknown): object is AppErrorProps {
  return !!appErrorSchema.parse(object);
}
