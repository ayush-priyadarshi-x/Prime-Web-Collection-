import { response } from "@/lib/response";
import dbConnect from "@/lib/dbConnect";
import user from "../../../../Types/user";
import userModel from "../../../../models/userModel";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(request: Request) {
  await dbConnect();
  const data: user = await request.json();
  const { username, email, password } = data;

  // Validate email format
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return response(false, "Invalid email format.", 400);
  }

  try {
    // Check if the user already exists
    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      if (existingUser.isVerified) {
        return response(
          false,
          "A user with this email already exists and is verified.",
          400
        );
      } else {
        // Update the existing, unverified user
        const hashedPassword = await bcrypt.hash(password, 10);
        const verifyCode = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        const verifyCodeExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        console.log("Generated verifyCodeExpiry:", verifyCodeExpiry); // Debugging log

        existingUser.username = username;
        existingUser.password = hashedPassword;
        existingUser.verifyCode = verifyCode;
        existingUser.verifyCodeExpiry = verifyCodeExpiry;

        // Log the user document before saving
        console.log("User before saving:", existingUser);

        await existingUser.save();

        return response(
          true,
          "User updated with a new verification code.",
          200,
          existingUser
        );
      }
    }

    // If the user does not exist, create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();
    const verifyCodeExpiry = await new Date(Date.now() + 3600000); // 1 hour from now

    console.log("Generated verifyCodeExpiry:", verifyCodeExpiry); // Debugging log

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
      verifyCode,
      verifyCodeExpiry: verifyCodeExpiry,
    });

    // Log the new user document before saving
    console.log("New user before saving:", newUser);

    await newUser.save();

    const emailResponse = await sendVerificationEmail(
      email,
      username,
      verifyCode
    );

    if (!emailResponse.success) {
      return response(false, "Verification email couldn't be send", 500);
    }
    return response(
      true,
      "Sign successfull and Verification email sent successfully. ",
      200,
      newUser
    );
  } catch (error) {
    console.error("Error during sign-up:", error);
    return response(false, "There was an error during sign-up", 500);
  }
}
