import {getCourses,getCourse,addCourse,editCourse,removeCourse,assignTeacher} from "../db/courseManagementQueries.js";
import {getTeacher} from "../db/teacherManagementQueries.js";


export async function getCoursesController(req,res){
    
    try{
        let courses = await getCourses();
        if(courses.length==0) return res.status(404).json({status:"error", message:"No courses found"});
        return res.status(200).json({status: "success", message:"Courses Sent", courses:courses});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function getCourseController(req,res){
    
    try{
        let courseID = req.params.courseID;
        let course = await getCourse(courseID);
        if(course.length==0) return res.status(404).json({status: "error", message: "Course not found"});
        return res.status(200).json({status: "success", message:"Course Retrieved", course: course[0]});    
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error"});
    }

}

export async function addCourseController(req,res){
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;

    try{
        let courseID = await addCourse(courseName,courseSemester);
        return res.status(200).json({status: "success", message: "Course added", courseID: courseID});
    }
    catch(error){
        return res.status(500).json({status: "error", message: "Database error" });
    }

}

export async function assignTeacherController(req,res){
    let courseID = req.params.courseID;
    let teacherID = req.params.teacherID;

    try{
        let teacher = await getTeacher(teacherID);
        if(!teacher) return res.status(400).json( {status: "error", message: "Teacher does not exist"} );

        let result = await assignTeacher(teacherID,courseID);
        if(result.affectedRows==0) return res.status(400).json( {status: "error", message: "Course does not exist"} );

        return res.status(200).json({status: "success", message: "Teacher assigned"});
    }
    catch(error){
        return res.status(500).json( {status: "error", message : "Database error" });
    }
    
}

export async function editCourseController(req,res){
    let courseID = req.params.courseID;
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;

    try{
        let result = await editCourse(courseName,courseSemester,courseID);
        if(result.affectedRows==0) return res.status(400).json({status: "error", message : "Course does not exist"} );

        return res.status(200).json({status: "success", message : "Course edited"});
    }
    catch(error){
        return res.status(500).json({status: "error", message : "Database error" });
    }
}

export async function removeCourseController(req,res){
    let courseID = req.params.courseID;
    
    try{
        let result = await removeCourse(courseID);
        if(result.affectedRows==0) return res.status(404).json({status: "error", message: "Course not found" });

        return res.status(200).json({status: "success", message: "Course removed"});
    }
    catch(error){
        if(error.message=="Cannot delete course with enrolled students"){
            return res.status(400).json({status: "error", message: error.message });
        }
        else{
            return res.status(500).json({status: "error", message: "Database error" });
        }
    }
}