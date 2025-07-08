import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function generateToken(userID,userType) {
  return jwt.sign(
    {
      userID: userID,
      userType: userType,
    },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}