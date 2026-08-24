import {pool} from "./connection.js";
import type {ResultSetHeader, RowDataPacket} from "mysql2";
import type {Course} from "../types/general.js";

export async function getCourses(){
    try{
        let courses = await pool.query<(Course & RowDataPacket)[]>(`
            SELECT LPAD(c.CID,6,"0") AS ID,
            c.NAME AS Name,
            c.SEMESTER AS Semester,
            LPAD(t.TID,6,"0") AS TeacherID,
            t.NAME AS TeacherName,
            t.SURNAME AS TeacherSurname
            FROM Courses c LEFT JOIN Teachers t ON c.TID = t.TID;
        `);
        return courses[0];
    }
    catch(error){
        throw error;
    }
}

export async function getCourse(courseID : string){
    try{
        let course = await pool.query<(Course & RowDataPacket)[]>(`
            SELECT LPAD(c.CID,6,"0") AS ID,
            c.NAME AS Name,
            c.SEMESTER AS Semester,
            LPAD(t.TID,6,"0") AS TeacherID,
            t.NAME AS TeacherName,
            t.SURNAME AS TeacherSurname
            FROM Courses c LEFT JOIN Teachers t ON c.TID = t.TID
             WHERE CID=?;`
            ,[courseID]
        );
        return course[0];
    }
    catch(error){
        throw error;
    }
}

export async function addCourse(courseName : string,courseSemester : number,teacherID : string | null){
    try{
        const [result] = await pool.query<ResultSetHeader>(`INSERT INTO Courses (NAME,SEMESTER,TID) VALUES(?,?,?);`,[courseName,courseSemester,teacherID]);
        return String(result.insertId).padStart(6,'0');
    }
    catch(error){
        throw error;
    }
}

export async function editCourse(courseName : string,courseSemester : number,teacherID : string | null,courseID : string){
    try{
        const [result] = await pool.query<ResultSetHeader>(
        `UPDATE Courses
        SET NAME=?, SEMESTER=?, TID=?
        WHERE CID=?;`,
        [courseName,courseSemester,teacherID,courseID]
        );
        return result;
    }
    catch(error){
        throw(error);
    }
}

export async function removeCourse(courseID : string){
    try{
        let attends = await pool.query<RowDataPacket[]>(`SELECT * FROM Attends WHERE CID=?;`,[courseID]);
        if(attends[0].length>0) throw new Error("Cannot delete course with enrolled students");

        const [result] = await pool.query<ResultSetHeader>(`DELETE FROM Courses WHERE CID=?;`,[courseID]);
        return result;
    }
    catch(error){
        throw error;
    }
}
