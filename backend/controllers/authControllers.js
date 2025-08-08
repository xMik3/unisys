import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {getStudentById,getTeacherById} from "../db/idQueries.js";
import {generateToken} from "../utils/generateToken.js";


export async function loginController(req,res){
  let userID = parseInt(req.body.userID);
  let userPWD = req.body.userPWD;
  let userType = req.body.userType;

  if(userType === "secretary" && userPWD === process.env.SECRETARY_PWD && userID === 0){
    return res.json({status: "success", message: "Login Successful", token:generateToken(userID,userType)});
  }

  let user;
  try{
    if(userType === "student"){
      user = await getStudentById(userID);
    }
    else if(userType === "teacher"){
      user = await getTeacherById(userID);
    }
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database error", token: null});
  }

  if(!user){
    return res.status(401).json({status: "error", message: "User not found", token: null});
  }

  try{
    let match = await bcrypt.compare(userPWD,user.PASSWORD);

    if(!match) return res.status(401).json({status:"error", message: "Invalid Credentials ", token: null});

    return res.status(200).json({status: "success", message: "Login Successful", token: generateToken(userID,userType)});
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Authentication Error", token: null });
  }

}
