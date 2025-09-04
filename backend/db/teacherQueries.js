import db from "./connection.js";

export async function getManagedCourses(teacherID){
    try{
        let courses = await db.promise().query(`
            SELECT LPAD(CID,6,"0") AS ID,
            NAME AS Name,
            SEMESTER AS Semester
            FROM Courses WHERE TID = ?;`,
            [teacherID]);
        return courses[0];
    }
    catch(error){
        throw error;
    }
}

export async function getManagedStudents(courseID,teacherID){
    try{
        let students = await db.promise().query(
            `SELECT LPAD(s.SID,6,"0") AS ID,
            s.NAME AS Name,
            s.SURNAME As Surname
            FROM Students s
            JOIN Attends a ON s.SID = a.SID
            JOIN Courses c ON a.CID = c.CID
            WHERE c.CID = ? AND c.TID = ? AND a.GRADE IS NULL;`,
            [courseID,teacherID]
        );
        return students[0];
    }
    catch(error){
        throw error;
    }
}  

export async function gradeStudent(grade,studentID,courseID,teacherID){
    try{
       return await db.promise().query(
        `UPDATE Attends a
        JOIN Courses c ON a.CID = c.CID
        SET a.GRADE = ?
        WHERE a.SID = ? AND a.CID = ? AND c.TID = ?;`,
        [grade,studentID,courseID,teacherID]
       ); 
    }catch(error){
       throw error; 
    }
}