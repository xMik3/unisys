import {pool} from "./connection.js";
import type {ResultSetHeader, RowDataPacket} from "mysql2";
import type {Student} from "../types/general.js";

export async function getStudents(year : string){
    try{
        let students = await pool.query<(Student & RowDataPacket)[]>(`
            SELECT LPAD(SID,6,"0") AS ID,
            NAME AS Name,
            SURNAME AS Surname,
            SEMESTER AS Semester,
            ENROLLMENTYEAR AS EnrollmentYear
            FROM Students
            WHERE ENROLLMENTYEAR=?;`,
            [year]);
        return students[0];
    }
    catch(error){
        throw error;
    }
}

export async function getStudent(studentID : string){
    try{
        let student = await pool.query<(Student & RowDataPacket)[]>(`
            SELECT LPAD(SID,6,"0") AS ID,
            NAME AS Name,
            SURNAME AS Surname,
            SEMESTER AS Semester,
            ENROLLMENTYEAR AS EnrollmentYear
            FROM Students
            WHERE SID=?;`,
            [studentID]);
        return student[0];
    }
    catch(error){
        throw error;
    }
}

export async function addStudent(studentName : string,studentSurname : string,studentPWD : string,studentEnrollmentYear : number,studentSemester : number){
    try{
        const [result] = await pool.query<ResultSetHeader>(`INSERT INTO Students (NAME,SURNAME,SEMESTER,PASSWORD,ENROLLMENTYEAR) VALUES(?,?,?,?,?);`,[studentName,studentSurname,studentSemester,studentPWD,studentEnrollmentYear]);
        return String(result.insertId).padStart(6,'0');
    }
    catch(error){
        throw error;
    }
}

export async function editStudent(studentName : string,studentSurname : string,studentPWD : string,studentID : string){
    try{
        const [result] = await pool.query<ResultSetHeader>(
        `UPDATE Students
        SET NAME=?, SURNAME=?, PASSWORD=?
        WHERE SID=?;`,
        [studentName,studentSurname,studentPWD,studentID]
        );
        return result;
    }
    catch(error){
        throw error;
    }
}

export async function removeStudent(studentID : string){
    try{
        const [result] = await pool.query<ResultSetHeader>(`DELETE FROM Students WHERE SID=?;`,[studentID]);
        return result;
    }
    catch(error){
        throw error;
    }
}

export async function advanceSemester(){
    try{
        await pool.query(
        `UPDATE Students
        SET SEMESTER = SEMESTER + 1;`);
    }
    catch(error){
        throw error;
    }
}
