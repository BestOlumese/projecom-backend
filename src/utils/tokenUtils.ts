import crypto from "crypto";
import jwt from "jsonwebtoken";

export const generateRandomToken = () => {
  return crypto.randomBytes(20).toString("hex");
};

export const generateEmailToken = (userId: string) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};
