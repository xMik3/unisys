import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {getTeachers,addTeacher,editTeacher,removeTeacher} from "../db/teacherManagementQueries.js";

export async function getTeachersController(req,res){
    
    try{
        let teachers = await getTeachers();
        return res.status(200).json(teachers);
    }
    catch(error){
        return res.status(500).json({ error : "Database error" });
    }

}

export async function addTeacherController(req,res){
    let teacherName = req.body.userName;
    let teacherSurname = req.body.userSurname;
    let teacherPWD = req.body.userPWD;

    let hashedTeacherPWD = await bcrypt.hash(teacherPWD,parseInt(process.env.SALT_ROUNDS));

    try{
        await addTeacher(teacherName,teacherSurname,hashedTeacherPWD);
        return res.status(200).json({ success : "Teacher added"});
    }
    catch(error){
        return res.status(500).json({ error : "Database error" });
    }

}

export async function editTeacherController(req,res){
    let teacherID = req.params.teacherID;
    let teacherName = req.body.userName;
    let teacherSurname = req.body.userSurname;
    let teacherPWD = req.body.userPWD;

    let hashedTeacherPWD = await bcrypt.hash(teacherPWD,parseInt(process.env.SALT_ROUNDS));

    try{
        let result = await editTeacher(teacherName,teacherSurname,hashedTeacherPWD,teacherID);
        if(result.affectedRows==0) return res.status(400).json( { error : "Teacher does not exist"} );

        return res.status(200).json({ success : "Teacher edited"});
    }
    catch(error){
        return res.status(500).json( { error : "Database error" });
    }
}

export async function removeTeacherController(req,res){
    let teacherID = req.params.teacherID;
    
    try{
        let result = await removeTeacher(teacherID);
        if(result.affectedRows==0) return res.status(404).json({ error: "Teacher not found" });

        return res.status(200).json({ success : "Teacher removed"});
    }
    catch(error){
        return res.status(500).json( { error : "Database error" });
    }
}