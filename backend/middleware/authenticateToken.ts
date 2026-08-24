import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import type {NextFunction, Request, Response} from "express";
import type {TokenPayload} from "../types/login.js";
dotenv.config();

export function authenticateToken(req : Request, res : Response, next : NextFunction) {
  const authHeader = req.headers["authorization"];
  if(!authHeader) return res.status(401).json({ status:"error", message:'No token provided' });

  const token = authHeader.split(" ")[1];
  if(!token) return res.status(401).json({ status:"error", message:'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET!, (error, user) => {
    if(error) return res.status(403).json({ status:"error", message: "Invalid token" });

    const payload = user as TokenPayload;

    req.userID = payload.userID;
    req.userType = payload.userType;
    next();
  });
}
