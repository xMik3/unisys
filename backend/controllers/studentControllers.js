import {getRegisteredCourses,registerCourse, unregisterCourse,getSemesters} from "../db/studentQueries.js"

export async function getRegisteredCoursesController(req,res){
  let studentID = req.userID;

  try{
    let courses = await getRegisteredCourses(studentID);
    return res.status(200).json({status: "success", message:"Registered Courses Retrieved", courses:courses}); 
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database error"});
  }
}

export async function registerCourseController(req,res){
  let courseID = req.params.courseID;
  let studentID = req.userID;

  try{
    let semesters = await getSemesters(studentID,courseID);
    if(!semesters) return res.status(400).json({status: "error", message: "Course does not exist."});

    if(semesters.studentSemester > semesters.courseSemester) return res.status(400).json({status: "error", message : "Invalid semester registration"});

    await registerCourse(studentID,courseID);

    return res.status(200).json({status: "success", message : "Registered To Course"});
  }
  catch(error){
    if(error.code == "ER_DUP_ENTRY") return res.status(400).json({status: "error", message: "Student already registered to course"});

    return res.status(500).json({status: "error", message : "Database error" });
  }
}

export async function removeCourseController(req,res){
  let courseID = req.params.courseID;
  let studentID = req.userID;

  try{
    let result = await unregisterCourse(studentID,courseID);
    if(result.affectedRows==0) return res.status(404).json({status: "error", message: "Student not enrolled in course"});

    return res.status(200).json({status: "error", message : "Removed From Course"});
  }
  catch(error){
    return res.status(500).json({status: "error", message : "Database error"});
  }
}