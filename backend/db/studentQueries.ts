import {pool} from "./connection.js";
import type {ResultSetHeader, RowDataPacket} from "mysql2";
import type {AvailableCourse, RegisteredCourse} from "../types/general.js";
import type {RegisteredCoursesCount} from "../types/student.js";

export async function getRegisteredCourses(studentID : number){
    try{
        let courses = await pool.query<(RegisteredCourse & RowDataPacket)[]>(
            `SELECT LPAD(c.CID,6,"0") AS ID,
            c.NAME AS Name,
            c.SEMESTER AS Semester,
            a.GRADE AS Grade,
            t.NAME AS TeacherName,
            t.SURNAME AS TeacherSurname
            FROM Students s
            JOIN Attends a ON s.SID = a.SID
            JOIN Courses c ON a.CID = c.CID
            LEFT JOIN Teachers t ON c.TID = t.TID
            WHERE s.SID = ?;`,
            [studentID]
        );
        return courses[0];
    }
    catch(error){
        throw error;
    }
}

export async function getAvailableCourses(studentID : number){
    try{
        let courses = await pool.query<(AvailableCourse & RowDataPacket)[]>(
            `SELECT LPAD(CID,6,"0") AS ID,
            NAME AS Name,
            SEMESTER AS Semester
            FROM Courses WHERE CID NOT IN(
                SELECT CID
                FROM Attends
                WHERE SID = ?
            ) AND SEMESTER <= (
                SELECT SEMESTER
                FROM Students
                WHERE SID = ?
            );`,
            [studentID,studentID]
        );
        return courses[0];
    }
    catch(error){
        throw error;
    }
}

export async function registerCourses(studentID : number,courses : string[]){
    try{
        const values = courses.map(course => [studentID, course, null]);

        const [result] = await pool.query<ResultSetHeader>(`INSERT INTO Attends (SID, CID, GRADE) VALUES ?;`,[values]);
        return result;
    }
    catch(error){
        throw error;
    }
}

export async function unregisterCourse(studentID : number,courseID : string){
    try{
        const [result] = await pool.query<ResultSetHeader>(`DELETE FROM Attends WHERE SID = ? AND CID = ? AND (GRADE IS NULL OR GRADE<5);`,[studentID,courseID]);
        return result;
    }
    catch(error){
        throw error;
    }
}

export async function getRegisteredCoursesCount(studentID : number){
    try{
        let count = await pool.query<(RegisteredCoursesCount & RowDataPacket)[]>(
            `SELECT COUNT(CID) AS registeredCourses
            FROM Attends
            WHERE SID=? AND (GRADE IS NULL OR GRADE < 5);
            `,
            [studentID]
        );
        // COUNT over no rows still returns one row, so this is never undefined.
        return count[0][0]!;
    }
    catch(error){
        throw error;
    }
}
