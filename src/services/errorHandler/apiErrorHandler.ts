import { ErrorPayload } from "@/types";
import { NextResponse } from "next/server";

export default function handleError(error: Error, customError?: ErrorPayload) {
  let status = 500;
  console.log("custom: ", customError);

  return NextResponse.json(
    {
      error: customError?.error ?? "ERR_UNKNOWN",
      message: customError?.message ?? error.message,
      status: customError?.status ?? status,
    },
    { status: customError?.status ?? status }
  );
}
