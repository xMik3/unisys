import {getCourses,addCourse,editCourse,removeCourse,assignTeacher} from "../db/secretaryQueries.js";
import {getTeacherById} from "../db/idQueries.js";


export async function getCoursesController(req,res){
    
    try{
        let courses = await getCourses();
        return res.status(200).json(courses);
    }
    catch(error){
        return res.status(500).json({ error : "Database error" });
    }

}

export async function addCourseController(req,res){
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;

    try{
        await addCourse(courseName,courseSemester);
        return res.status(200).json({ success : "Course added"});
    }
    catch(error){
        return res.status(500).json({ error : "Database error" });
    }

}

export async function assignTeacherController(req,res){
    let courseID = req.params.courseID;
    let teacherID = req.params.teacherID;

    try{
        let teacher = await getTeacherById(teacherID);
        if(!teacher) return res.status(400).json( { error : "Teacher does not exist"} );

        let result = await assignTeacher(teacherID,courseID);
        if(result.affectedRows==0) return res.status(400).json( { error : "Course does not exist"} );

        return res.status(200).json({ success : "Teacher assigned"});
    }
    catch(error){
        return res.status(500).json( { error : "Database error" });
    }
    
}

export async function editCourseController(req,res){
    let courseID = req.params.courseID;
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;

    try{
        let result = await editCourse(courseName,courseSemester,courseID);
        if(result.affectedRows==0) return res.status(400).json( { error : "Course does not exist"} );

        return res.status(200).json({ success : "Course edited"});
    }
    catch(error){
        return res.status(500).json( { error : "Database error" });
    }
}

export async function removeCourseController(req,res){
    let courseID = req.params.courseID;
    
    try{
        let result = await removeCourse(courseID);
        if(result.affectedRows==0) return res.status(404).json({ error: "Course not found" });

        return res.status(200).json({ success : "Course removed"});
    }
    catch(error){
        return res.status(500).json( { error : "Database error" });
    }
}