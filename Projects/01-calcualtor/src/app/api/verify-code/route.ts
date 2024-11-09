import dbConnect from "@/lib/dbConnect";
import { response } from "@/lib/response";
import userModel from "../../../../models/userModel";

export async function POST(request: Request) {
  await dbConnect();

  const data = await request.json();
  const { username, code }: { username: string; code: string } = data;

  try {
    const user = await userModel.findOne({ username });
    if (!user) {
      return response(false, "User doesn't exist", 404);
    }

    if (user.verified) {
      return response(true, "User already verified.", 200);
    }

    const isCodeValid: boolean = code == user.verifyCode;
    const isCodeNotExpired: boolean =
      new Date(user.verifyCodeExpiry) > new Date();

    if (!isCodeValid) {
      return response(false, "Verification code is not correct.", 401);
    }

    if (!isCodeNotExpired) {
      return response(false, "Code has expired.", 402);
    }

    user.isVerified = true;
    await user.save(); // Make sure to await the save operation
    console.log("User verification code set successfully. ");

    return response(true, "Successfully verified ID", 200);
  } catch (error) {
    console.log("Error: ", error);
    return response(false, "There was some error while verifying code.", 500);
  }
}
