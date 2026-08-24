import {getCourses,getCourse,addCourse,editCourse,removeCourse} from "../db/courseManagementQueries.js";
import {getTeacher} from "../db/teacherManagementQueries.js";

import type {Request,Response} from "express";
import type {CourseIDParam} from "../types/general.js";
import type {CreateCourseRequest,CreateCourseResponse,EditCourseRequest,EditCourseResponse,GetCourseResponse,GetCoursesResponse,RemoveCourseResponse} from "../types/secretary.js";

export async function getCoursesController(req : Request,res : Response<GetCoursesResponse>){

    try{
        let courses = await getCourses();
        if(courses.length==0) return res.status(404).json({status:"error", message:"No courses found"});
        return res.status(200).json({status: "success", message:"Courses Sent", courses:courses});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function getCourseController(req : Request<CourseIDParam>,res : Response<GetCourseResponse>){

    try{
        let courseID = req.params.courseID;
        let course = await getCourse(courseID);
        if(course.length==0) return res.status(404).json({status: "error", message: "Course not found"});
        return res.status(200).json({status: "success", message:"Course Retrieved", course: course[0]!});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function addCourseController(req : Request<{},{},CreateCourseRequest>,res : Response<CreateCourseResponse>){
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;
    let teacherID : string | null = req.body.teacherID;

    try{

        if(teacherID=="NULL"){
            teacherID = null;
        }
        else{
            // teacherManagementQueries is still JS, so its rows come back as the
            // raw QueryResult union. Drop the cast once step 8 ports it.
            let teacher = await getTeacher(teacherID);
            if(teacher.length===0) return res.status(400).json( {status: "error", message: "Teacher does not exist"} );
        }

        let courseID = await addCourse(courseName,courseSemester,teacherID);
        return res.status(200).json({status: "success", message: "Course added", courseID: courseID});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error" });
    }

}

export async function editCourseController(req : Request<CourseIDParam,{},EditCourseRequest>,res : Response<EditCourseResponse>){
    let courseID = req.params.courseID;
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;
    let teacherID : string | null = req.body.teacherID;

    try{

        if(teacherID=="NULL"){
            teacherID = null;
        }
        else{
            let teacher = await getTeacher(teacherID);
            if(teacher.length===0) return res.status(400).json( {status: "error", message: "Teacher does not exist"} );
        }

        let result = await editCourse(courseName,courseSemester,teacherID,courseID);
        if(result.affectedRows==0) return res.status(400).json({status: "error", message : "Course does not exist"} );

        return res.status(200).json({status: "success", message : "Course edited"});
    }
    catch(error){
        return res.status(500).json({status: "error", message : "Database error" });
    }
}

export async function removeCourseController(req : Request<CourseIDParam>,res : Response<RemoveCourseResponse>){
    let courseID = req.params.courseID;

    try{
        let result = await removeCourse(courseID);
        if(result.affectedRows==0) return res.status(404).json({status: "error", message: "Course not found" });

        return res.status(200).json({status: "success", message: "Course removed"});
    }
    catch(error){
        // removeCourse signals the enrolled-students case with a plain Error.
        const failure = error as Error;

        if(failure.message=="Cannot delete course with enrolled students"){
            return res.status(400).json({status: "error", message: failure.message });
        }
        else{
            return res.status(500).json({status: "error", message: "Database error" });
        }
    }
}
