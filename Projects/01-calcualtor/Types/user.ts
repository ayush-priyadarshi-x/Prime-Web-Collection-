import operation from "./operation";
import { Document } from "mongoose";

export default interface user extends Document {
  username: string;
  email: string;
  password: string;
  isVerified?: boolean;
  verifyCode: Number;
  verifyCodeExpiriy: Date;
  confirmPassword?: string;
  operations?: operation[];
}
