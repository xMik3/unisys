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
    return res.json(generateToken(userID,userType));
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
    return res.status(500).json({ error: "Database error" });
  }

  if(!user){
    return res.status(401).json({ error: "User not found" });
  }

  try{
    let match = await bcrypt.compare(userPWD,user.PASSWORD);

    if(!match) return res.status(401).json({ error: "Invalid Credentials "});

    return res.status(200).json(generateToken(userID,userType));
  }
  catch(error){
    return res.status(500).json({ error: "Authentication Error"});
  }

}
