import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; 
  
  const token = authHeader.split(" ")[1];
  if(!token) return res.status(401).json({ status:"error", message:'No token provided' });

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if(error) return res.status(403).json({ status:"error", message: "Invalid token" });

    req.userID = user.userID;
    req.userType = user.userType;
    next();
  });
}
