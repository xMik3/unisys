import db from "../db/connection.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.js";
import dotenv from "dotenv";
dotenv.config();

export function login(req,res){
  let query;

  let userID = parseInt(req.body.userID);
  let userPWD = req.body.userPWD;
  let userType = req.body.userType;

  if(userType === "secretary" && userPWD === process.env.SECRETARY_PWD && userID === 0){
    return res.json(generateToken(userID,userType));
  }
  else if(userType === "student"){
    query = `SELECT * FROM Students WHERE (SID = ?);`;
  }
  else if(userType === "teacher"){
    query = `SELECT * FROM Teachers WHERE (TID = ?);`;
  }
  else{
    return res.status(400).json({ error: "Invalid user type" });
  }

  
  db.query(query,[userID],(error,results)=>{
    if(error) return res.status(500).json({ error: "Database error" });

    if (!results[0]) return res.status(401).json({ error: "User not found" });

    bcrypt.compare(userPWD,results[0].PASSWORD, (error,match)=>{

      if(error) return res.status(500).json({ error: "Authentication Error"});

      if(!match) return res.status(401).json({ error: "Invalid Credentials "});

      return res.status(200).json(generateToken(userID,userType));

    });

  });

}
