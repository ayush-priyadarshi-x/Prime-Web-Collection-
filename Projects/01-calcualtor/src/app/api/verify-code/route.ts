import dbConnect from "@/lib/dbConnect";
import { response } from "@/lib/response";
import userModel from "../../../../models/userModel";

export async function POST(request: Request) {
  await dbConnect();

  const data = await request.json();
  console.log("Data : ", data);
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
      new Date(user.verifyCodeExpiry) > new Date(); // Ensure the expiry is compared as Date objects
    console.log("User code : ", user.verifyCode);
    console.log("verification date : ", user.verifyCodeExpiry);

    if (!isCodeValid) {
      return response(false, "Verification code is not correct.", 401);
    }

    if (!isCodeNotExpired) {
      return response(false, "Code has expired.", 402);
    }

    // Mark user as verified and save the user data asynchronously
    user.isVerified = true;
    await user.save(); // Make sure to await the save operation

    return response(true, "Successfully verified ID", 200);
  } catch (error) {
    console.log("Error: ", error);
    return response(false, "There was some error while verifying code.", 500);
  }
}
