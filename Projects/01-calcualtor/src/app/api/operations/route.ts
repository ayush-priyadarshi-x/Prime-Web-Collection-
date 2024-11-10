import { response } from "@/lib/response";
import { NextRequest } from "next/server";
import userModel from "../../../../models/userModel";
import mongoose from "mongoose";
import operation from "../../../../Types/operation";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const _id = searchParams.get("_id");
  if (_id) {
    try {
      const userData = await userModel.findOne({
        _id: new mongoose.Types.ObjectId(_id),
      });
      if (!userData) {
        return response(false, "User doesn't exist", 400);
      }
      if (!userData.isVerified) {
        return response(false, "User is not verified. ", 400);
      }
      return response(true, "User data retrieved. ", 200);
    } catch (error) {
      response(false, "Internal server error. ", 500, error as string);
    }
  }
}
export async function POST(request: Request) {
  try {
    const data = await request.json();
    const email = data.email;
    const userGivenOperation: operation = data.operation;

    if (!userGivenOperation) {
      return response(false, "Operation is not provided.", 400);
    }

    if (!email) {
      return response(false, "Email is not provided.", 401);
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response(false, "User does not exist.", 402);
    }

    if (!user.isVerified) {
      return response(false, "User is not verified.", 403);
    }

    // Ensure operations is an array and append new operation
    const newOperations = [...(user.operations || []), userGivenOperation];
    user.operations = newOperations;

    await user.save();

    return response(true, "Operation saved successfully.", 200);
  } catch (error) {
    console.error("Error in POST request:", error);
    return response(false, "An unexpected error occurred.", 500);
  }
}
