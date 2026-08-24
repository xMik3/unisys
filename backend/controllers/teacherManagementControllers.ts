import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {getTeachers,getTeacher,addTeacher,editTeacher,removeTeacher} from "../db/teacherManagementQueries.js";

import type {Request,Response} from "express";
import type {TeacherIDParam} from "../types/general.js";
import type {CreateTeacherRequest,CreateTeacherResponse,EditTeacherRequest,EditTeacherResponse,GetTeacherResponse,GetTeachersResponse,RemoveTeacherResponse} from "../types/secretary.js";

export async function getTeachersController(req : Request,res : Response<GetTeachersResponse>){

    try{
        let teachers = await getTeachers();
        if(teachers.length==0) return res.status(404).json({status:"error", message:"No teachers found"});
        return res.status(200).json({status: "success", message:"Teachers Retrieved", teachers: teachers});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function getTeacherController(req : Request<TeacherIDParam>,res : Response<GetTeacherResponse>){
    let teacherID = req.params.teacherID;

    try{
        let teacher = await getTeacher(teacherID);
        if(teacher.length==0) return res.status(404).json({status: "error", message: "Teacher not found"});
        return res.status(200).json({status: "success", message:"Teacher Retrieved", teacher: teacher[0]!});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function addTeacherController(req : Request<{},{},CreateTeacherRequest>,res : Response<CreateTeacherResponse>){
    let teacherName = req.body.teacherName;
    let teacherSurname = req.body.teacherSurname;
    let teacherPWD = req.body.teacherPWD;

    try{
        let hashedTeacherPWD = await bcrypt.hash(teacherPWD,parseInt(process.env.SALT_ROUNDS!));

        let teacherID = await addTeacher(teacherName,teacherSurname,hashedTeacherPWD);
        return res.status(200).json({status: "success", message : "Teacher added",teacherID: teacherID  });
    }
    catch(error){
        return res.status(500).json({status: "error", message : "Database error"});
    }

}

export async function editTeacherController(req : Request<TeacherIDParam,{},EditTeacherRequest>,res : Response<EditTeacherResponse>){
    let teacherID = req.params.teacherID;
    let teacherName = req.body.teacherName;
    let teacherSurname = req.body.teacherSurname;
    let teacherPWD = req.body.teacherPWD;

    try{
        let hashedTeacherPWD = await bcrypt.hash(teacherPWD,parseInt(process.env.SALT_ROUNDS!));

        let result = await editTeacher(teacherName,teacherSurname,hashedTeacherPWD,teacherID);
        if(result.affectedRows==0) return res.status(400).json({status: "error", message: "Teacher does not exist"} );

        return res.status(200).json({status: "success", message: "Teacher edited"});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error" });
    }
}

export async function removeTeacherController(req : Request<TeacherIDParam>,res : Response<RemoveTeacherResponse>){
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
