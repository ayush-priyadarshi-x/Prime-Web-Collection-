import { operation } from "./operation";

export interface user {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  operations?: operation[];
}
