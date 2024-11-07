import { response } from "@/lib/response";
import dbConnect from "@/lib/dbConnect";
import user from "../../../../Types/user";
import userModel from "../../../../models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  await dbConnect();
  const data: user = await request.json();
  const { username, email, password } = data;

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        // If the user exists and is verified, return an error response
        return response(false, "A user with this email already exists.", 400);
      } else {
        // Update the existing, unverified user
        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        existingUser.username = username;
        existingUser.password = hashedPassword;
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = verifyCodeExpiry;

        await existingUser.save();
        return response(
          true,
          "User updated with verification code.",
          200,
          existingUser
        );
      }
    }

    // If the user does not exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = new Date(Date.now() + 3600000);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry,
    });

    await newUser.save();
    return response(true, "Successfully signed up", 200, newUser);
  } catch (error) {
    console.error("Error:", error);
    return response(false, "There was an error during sign-up", 500);
  }
}
