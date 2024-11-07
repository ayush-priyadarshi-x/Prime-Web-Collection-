import { NextResponse } from "next/server";

export const response = (
  success: boolean,
  message: string,
  status: number,
  data?: string | number | boolean
) => {
  return NextResponse.json(
    { success: success, message: message, data: data },
    { status: status }
  );
};
