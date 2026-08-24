import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type {UserType} from "../types/general.js";
dotenv.config();

export function generateToken(userID : number, userType : UserType) {
  return jwt.sign(
    {
      userID: userID,
      userType: userType,
    },
    process.env.JWT_SECRET!,
    { expiresIn: '2h' }
  );
}
