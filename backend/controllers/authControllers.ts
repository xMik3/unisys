import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {getUserPassword} from "../db/authQueries.js";
import {generateToken} from "../utils/generateToken.js";

import type {Request,Response} from "express";
import type {LoginRequest,LoginResponse} from "../types/login.js";

export async function loginController(req : Request<{},{},LoginRequest>,res : Response<LoginResponse>){
  let userID = parseInt(req.body.userID);
  let userPWD = req.body.userPWD;
  let userType = req.body.userType;

  if(userType === "Secretary"){
    if(userPWD==process.env.SECRETARY_PWD && userID==0){
      return res.status(200).json({status: "success", message: "Login Successful", token:generateToken(userID,userType)});
    }
    else{
      return res.status(401).json({status: "error", message: "Incorrect Credentials" });
    }
  }

  // userType has narrowed to Student | Teacher now that Secretary has returned.
  let userPassword;
  try{
    userPassword = await getUserPassword(userID,userType);
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database error"});
  }

  if(!userPassword){
    return res.status(401).json({status: "error", message: "User not found"});
  }

  try{
    let match = await bcrypt.compare(userPWD,userPassword);

    if(!match) return res.status(401).json({status:"error", message: "Invalid Credentials "});

    return res.status(200).json({status: "success", message: "Login Successful", token: generateToken(userID,userType)});
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Authentication Error"});
  }

}
