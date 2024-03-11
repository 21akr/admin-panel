import { UserModel } from "../database";
import crypto from "crypto";

export function findUserById(id: string) {
  return UserModel.findById(id);
}

export function findUserByEmail(email: string) {
  return UserModel.findOne({ email });
}

export function newPassword() {
  return crypto
    .randomBytes(Math.ceil(16 / 2))
    .toString("hex")
    .slice(0, 12);
}
