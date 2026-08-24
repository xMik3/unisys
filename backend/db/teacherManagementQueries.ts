import {pool} from "./connection.js";
import type {ResultSetHeader, RowDataPacket} from "mysql2";
import type {Teacher} from "../types/general.js";

export async function getTeachers(){
    try{
        let teachers = await pool.query<(Teacher & RowDataPacket)[]>(`
            SELECT LPAD(TID,6,"0") AS ID,
            NAME AS Name,
            SURNAME AS Surname
            FROM Teachers;
        `);
        return teachers[0];
    }
    catch(error){
        throw error;
    }
}

export async function getTeacher(teacherID : string){
    try{
        let teacher = await pool.query<(Teacher & RowDataPacket)[]>(`
            SELECT LPAD(TID,6,"0") AS ID,
            NAME AS Name,
            SURNAME AS Surname
            FROM Teachers WHERE TID=?;`,
            [teacherID]);
        return teacher[0];
    }
    catch(error){
        throw error;
    }
}

export async function addTeacher(teacherName : string,teacherSurname : string,teacherPWD : string){
    try{
        const [result] = await pool.query<ResultSetHeader>(`INSERT INTO Teachers (NAME,SURNAME,PASSWORD) VALUES(?,?,?);`,[teacherName,teacherSurname,teacherPWD]);
        return String(result.insertId).padStart(6,'0');
    }
    catch(error){
        throw error;
    }
}

export async function editTeacher(teacherName : string,teacherSurname : string,teacherPWD : string,teacherID : string){
    try{
        const [result] =  await pool.query<ResultSetHeader>(
        `UPDATE Teachers
        SET NAME=?, SURNAME=?, PASSWORD=?
        WHERE TID=?;`,
        [teacherName,teacherSurname,teacherPWD,teacherID]
        );
        return result;
    }
    catch(error){
        throw(error);
    }
}

export async function removeTeacher(teacherID : string){
    try{
        const [result] = await pool.query<ResultSetHeader>(`DELETE FROM Teachers WHERE TID=?;`,[teacherID]);
        return result;
    }
    catch(error){
        throw error;
    }
}
