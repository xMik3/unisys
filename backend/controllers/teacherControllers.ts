import {getManagedCourses, getManagedStudents, gradeStudent} from "../db/teacherQueries.js";
import { getCourse } from "../db/courseManagementQueries.js";

import type {Request,Response} from "express";
import type {CourseIDParam,ManagedStudentParams} from "../types/general.js";
import type {GetManagedCoursesResponse,GetManagedStudentsResponse,GradeStudentRequest,GradeStudentResponse} from "../types/teacher.js";

export async function getManagedCoursesController(req : Request,res : Response<GetManagedCoursesResponse>){
  let teacherID = req.userID!;

  try{
    let courses = await getManagedCourses(teacherID);
    return res.status(200).json({status: "success", message: "Managed Courses Retrieved", courses: courses});
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database error"});
  }
}

export async function getManagedStudentsController(req : Request<CourseIDParam>,res : Response<GetManagedStudentsResponse>){
  let courseID = req.params.courseID;
  let teacherID = req.userID!;

  try{
    let students = await getManagedStudents(courseID,teacherID);
    return res.status(200).json({status: "success", message: "Managed Students Retrieved", students: students});
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database error"});
  }
}

export async function gradeStudentController(req : Request<ManagedStudentParams,{},GradeStudentRequest>,res : Response<GradeStudentResponse>){
  let courseID = req.params.courseID;
  let studentID = req.params.studentID;
  let userID = req.userID!;

  let grade = req.body.grade;

  try{
    let result = await gradeStudent(grade,studentID,courseID,userID);
    if(result.affectedRows==0){
      let course = await getCourse(courseID);

      if(course.length==0) return res.status(404).json({status: "error", message: "Course not found"});

      if(Number(course[0]!.TeacherID) != userID) return res.status(403).json({status: "error", message: "Access denied"});

      return res.status(404).json({status: "error", message: "Student not enrolled in course"});
    }

    return res.status(200).json({status:"success", message: "Student graded" });
  }
  catch(error){
    return res.status(500).json({status:"error", message: "Database error" });
  }
}
