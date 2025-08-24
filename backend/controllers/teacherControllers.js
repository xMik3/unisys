import {getManagedCourses, getManagedStudents, gradeStudent} from "../db/teacherQueries.js";

export async function getManagedCoursesController(req,res){
  let teacherID = req.userID;

  try{
    let courses = await getManagedCourses(teacherID);
    return res.status(200).json({status: "success", message: "Managed Courses Retrieved", courses: courses});
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database Error"});
  }
}

export async function getManagedStudentsController(req,res){
  let courseID = req.params.courseID;
  let teacherID = req.userID;
  
  try{
    let students = await getManagedStudents(courseID,teacherID);
    return res.status(200).json({status: "success", message: "Managed Students Retrieved", students: students});
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database Error"});
  }
}

export async function gradeStudentController(req,res){
  let courseID = req.params.courseID;
  let studentID = req.params.studentID;
  let userID = req.userID;

  let grade = req.body.grade;
  
  try{
    let result = await gradeStudent(grade,studentID,courseID,userID);
    if(result.affectedRows==0) return res.status(403).json({status: "error", message: "Unauthorized To Grade This Student" });

    return res.status(200).json({status:"success", message: "Student graded" });
  }
  catch(error){
    return res.status(500).json({status:"error", message: "Database Error" });
  }
}

