import {getRegisteredCourses,registerCourse, unregisterCourse} from "../db/studentQueries.js"
import {getCourseById} from "../db/idQueries.js";

export async function getRegisteredCoursesController(req,res){
  let studentID = req.userID;

  try{
    let courses = await getRegisteredCourses(studentID);
    return res.status(200).json(courses); 
  }
  catch(error){
    return res.status(500).json({ error : "Database error" });
  }
}

export async function registerCourseController(req,res){
  let courseID = req.params.courseID;
  let studentID = req.userID;

  try{
    let semesters = await getSemesters(studentID,courseID);
    if(!semesters) return res.status(400).json({ error : "Course does not exist."});

    if(semesters.studentSemester > semesters.courseSemester) return res.status(400).json({ error : "Invalid semester registration"});

    await registerCourse(studentID,courseID);

    return res.status(200).json({ success : "Registered To Course" });
  }
  catch(error){
    if(error.code == "ER_DUP_ENTRY") return res.status(400).json({ error : "Student already registered to course"});

    return res.status(500).json({ error : "Database error" });
  }
}

export async function removeCourseController(req,res){
  let courseID = req.params.courseID;
  let studentID = req.userID;

  try{
    let result = await unregisterCourse(studentID,courseID);
    if(result.affectedRows==0) return res.status(404).json({ error: "Student not enrolled in course" });

    return res.status(200).json({ error : "Removed From Course" });
  }
  catch(error){
    return res.status(500).json({ error : "Database error" });
  }
}