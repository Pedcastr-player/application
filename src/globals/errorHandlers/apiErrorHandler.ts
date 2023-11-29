import { NextResponse } from "next/server";
import { isAppErrorProps } from "@/types";

export default function getErrorResponse(error: unknown) {
  if (isAppErrorProps(error)) {
    return NextResponse.json(error, { status: error.status ?? 500 });
  }
  return NextResponse.json(error, { status: 500 });
}
