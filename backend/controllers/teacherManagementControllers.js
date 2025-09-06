import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {getTeachers,getTeacher,addTeacher,editTeacher,removeTeacher} from "../db/teacherManagementQueries.js";

export async function getTeachersController(req,res){
    
    try{
        let teachers = await getTeachers();
        if(teacher.length==0) return res.status(404).json({status:"error", message:"No teachers found"});
        return res.status(200).json({status: "success", message:"Teachers Retrieved", teachers: teachers});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function getTeacherController(req,res){
    let teacherID = req.params.teacherID;
    
    try{
        let teacher = await getTeacher(teacherID);
        if(teacher.length==0) return res.status(404).json({status: "error", message: "Teacher not found"});
        return res.status(200).json({status: "success", message:"Teacher Retrieved", teacher: teacher[0]});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function addTeacherController(req,res){
    let teacherName = req.body.teacherName;
    let teacherSurname = req.body.teacherSurname;
    let teacherPWD = req.body.teacherPWD;

    let hashedTeacherPWD = await bcrypt.hash(teacherPWD,parseInt(process.env.SALT_ROUNDS));

    try{
        await addTeacher(teacherName,teacherSurname,hashedTeacherPWD);
        return res.status(200).json({status: "success", message : "Teacher added"});
    }
    catch(error){
        return res.status(500).json({status: "error", message : "Database error"});
    }

}

export async function editTeacherController(req,res){
    let teacherID = req.params.teacherID;
    let teacherName = req.body.teacherName;
    let teacherSurname = req.body.teacherSurname;
    let teacherPWD = req.body.teacherPWD;

    let hashedTeacherPWD = await bcrypt.hash(teacherPWD,parseInt(process.env.SALT_ROUNDS));

    try{
        let result = await editTeacher(teacherName,teacherSurname,hashedTeacherPWD,teacherID);
        if(result.affectedRows==0) return res.status(400).json({status: "error", message: "Teacher does not exist"} );

        return res.status(200).json({status: "success", message: "Teacher edited"});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error" });
    }
}

export async function removeTeacherController(req,res){
    let teacherID = req.params.teacherID;
    
    try{
        let result = await removeTeacher(teacherID);
        if(result.affectedRows==0) return res.status(404).json({status: "error", message: "Teacher not found" });

        return res.status(200).json({status: "success", message: "Teacher removed"});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error" });
    }
}