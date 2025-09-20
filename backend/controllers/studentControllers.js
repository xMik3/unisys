import {getRegisteredCourses,registerCourses, unregisterCourse,getAvailableCourses} from "../db/studentQueries.js"

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

export async function getAvailableCoursesController(req,res){
  let studentID = req.userID;

  try{
    let courses = await getAvailableCourses(studentID);
    return res.status(200).json({status:"success",message:"Available Courses Retrieved", courses:courses});
  }
  catch(error){
    return res.status(500).json({status: "error", message: "Database error"});
  }

}

export async function registerCoursesController(req,res){
  let studentID = req.userID;
  let courses = req.courses;

  try{
    let registeredCoursesCount = await getRegisteredCourses(studentID);

    if(7-registeredCoursesCount.length-courses.length<0) return res.status(400).json({status: "error", message: "Cannot register to more than 7 courses"});

    await registerCourses(studentID,courses);

    return res.status(200).json({status: "success", message : "Registered To Courses"});
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