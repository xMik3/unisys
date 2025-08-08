import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {getStudents,addStudent,editStudent,removeStudent,advanceSemester} from "../db/studentManagementQueries.js";

export async function getStudentsController(req,res){

    try{
        let students = await getStudents();
        return res.status(200).json({status:"success", message:"Students Retrieved", students: students});
    }
    catch(error){
        return res.status(500).json({status:"error", message : "Database error", students: null});
    }

}

export async function addStudentController(req,res){
    let studentName = req.body.userName;
    let studentSurname = req.body.userSurname;
    let studentPWD = req.body.userPWD;

    let hashedStudentPWD = await bcrypt.hash(studentPWD,parseInt(process.env.SALT_ROUNDS));

    try{
        await addStudent(studentName,studentSurname,hashedStudentPWD);
        return res.status(200).json({ status: "success", message: "Student added"});
    }
    catch(error){
        return res.status(500).json({ status: "error", message: "Database error" });
    }

}

export async function editStudentController(req,res){
    let studentID = req.params.studentID;
    let studentName = req.body.userName;
    let studentSurname = req.body.userSurname;
    let studentPWD = req.body.userPWD;

    let hashedStudentPWD = await bcrypt.hash(studentPWD,parseInt(process.env.SALT_ROUNDS));

    try{
        let result = await editStudent(studentName,studentSurname,hashedStudentPWD,studentID);
        if(result.affectedRows==0) return res.status(400).json({status: "error", message : "Student does not exist"} );

        return res.status(200).json({status: "success", message : "Student edited"});
    }
    catch(error){
        return res.status(500).json({status: "error", message : "Database error" });
    }
}

export async function removeStudentController(req,res){
    let studentID = req.params.studentID;
    
    try{
        let result = await removeStudent(studentID);
        if(result.affectedRows==0) return res.status(404).json({status :"error", message: "Student not found" });

        return res.status(200).json({status:"success", message : "Student removed"});
    }
    catch(error){
        return res.status(500).json({status: "error", message : "Database error" });
    }
}

export async function advanceSemesterController(req,res){
    try{
        await advanceSemester();
        return res.status(200).json({status: "success", message : "Semester advanced"});
    }
    catch(error){
        return res.status(500).json({status: "error", message : "Database error" });
    }
}