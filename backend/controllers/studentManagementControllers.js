import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

import {getStudents,getStudent,addStudent,editStudent,removeStudent,advanceSemester} from "../db/studentManagementQueries.js";

export async function getStudentsController(req,res){

    try{
        let year = req.params.year;
        let students = await getStudents(year);
        if(students.length==0) return res.status(404).json({status:"error", message:"No students found"});
        return res.status(200).json({status:"success", message:"Students Retrieved", students: students});
    }
    catch(error){
        return res.status(500).json({status:"error", message : "Database error"});
    }

}

export async function getStudentController(req,res){
    
    
    try{
        let studentID = req.params.studentID;
        let student = await getStudent(studentID);

        if(student.length==0) return res.status(404).json({status:"error", message:"Student not found"});
        return res.status(200).json({status:"success", message:"Student Retrieved", student: student[0]});
    }
    catch(error){
        return res.status(500).json({status:"error", message : "Database error"});
    }

}

export async function addStudentController(req,res){
    let studentName = req.body.studentName;
    let studentSurname = req.body.studentSurname;
    let studentPWD = req.body.studentPWD;
    let studentEnrollmentYear = req.body.studentEnrollmentYear;
    let studentSemester = 1+2*(parseInt(new Date().getFullYear()) - parseInt(studentEnrollmentYear));

    let hashedStudentPWD = await bcrypt.hash(studentPWD,parseInt(process.env.SALT_ROUNDS));

    try{
        let studentID = await addStudent(studentName,studentSurname,hashedStudentPWD,studentEnrollmentYear,studentSemester);
        return res.status(200).json({ status: "success", message: "Student added", studentID: studentID });
    }
    catch(error){
        return res.status(500).json({ status: "error", message: "Database error" });
    }

}

export async function editStudentController(req,res){
    let studentID = req.params.studentID;
    let studentName = req.body.studentName;
    let studentSurname = req.body.studentSurname;
    let studentPWD = req.body.studentPWD;

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