import { NextRequest } from "next/server";
import userModel from "../../../../models/userModel";
import { response } from "@/lib/response";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const identifier = searchParams.get("_id");

  try {
    const userData = await userModel.findOne({ identifier });
    if (!userData) {
      return response(false, "User not found. ", 400);
    }
    if (!userData.isVerified) {
      return response(false, "User is not verified. ", 400);
    }

    return response(true, "Successfully retrieved data. ", 200, userData);
  } catch (error) {
    return response(
      false,
      "Something wrong with the server. ",
      500,
      error as string
    );
  }
}
