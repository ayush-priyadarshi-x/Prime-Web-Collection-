import mongoose, { Schema, model } from "mongoose";
import user from "./../Types/user";
import operation from "../Types/operation";

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
  verifyCode: { type: String, required: true },
  verifyCodeExpiriy: { type: Date },
  operations: {
    type: [operationSchema],
  },
});

const userModel =
  mongoose.models["nextJs-calculator"] ||
  model("nextJs-calculator", userSchema);
export default userModel;
