import {pool} from "./connection.js";
import type {ResultSetHeader, RowDataPacket} from "mysql2";
import type {ManagedCourse, ManagedStudent} from "../types/general.js";

export async function getManagedCourses(teacherID : number){
    try{
        let courses = await pool.query<(ManagedCourse & RowDataPacket)[]>(`
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

export async function getManagedStudents(courseID : string,teacherID : number){
    try{
        let students = await pool.query<(ManagedStudent & RowDataPacket)[]>(
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

export async function gradeStudent(grade : number,studentID : string,courseID : string,teacherID : number){
    try{
       const [result] = await pool.query<ResultSetHeader>(
        `UPDATE Attends a
        JOIN Courses c ON a.CID = c.CID
        SET a.GRADE = ?
        WHERE a.SID = ? AND a.CID = ? AND c.TID = ?;`,
        [grade,studentID,courseID,teacherID]
       );
       return result;
    }catch(error){
       throw error;
    }
}
