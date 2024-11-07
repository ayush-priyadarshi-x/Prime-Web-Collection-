import mongoose, { Schema, model } from "mongoose";
import user from "./../Types/user"; // Assuming your user type is correctly defined
import operation from "../Types/operation"; // Assuming your operation type is correctly defined

// Define the operation schema
const operationSchema: Schema<operation> = new Schema({
  prompt: {
    type: String,
    required: true,
  },
  result: {
    type: Number,
    required: true,
  },
});

// Define the user schema
const userSchema: Schema<user> = new Schema({
  username: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verifyCode: {
    type: String,
    required: true,
  },
  verifyCodeExpiry: {
    type: Date,
    required: true,
  },
  operations: {
    type: [operationSchema], // Reference to the operations schema
  },
});

// Create or use the existing user model
const userModel =
  mongoose.models["nextJs-calculator"] ||
  model("nextJs-calculator", userSchema);

export default userModel;
