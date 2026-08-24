import {pool} from "./connection.js";
import type {RowDataPacket} from "mysql2";

type PasswordRow = {
    PASSWORD : string;
}

async function getStudentPassword(studentID : number){
    const [rows] = await pool.query<(PasswordRow & RowDataPacket)[]>(`SELECT PASSWORD FROM Students WHERE SID=?;`,[studentID]);
    return rows[0]?.PASSWORD;
}

async function getTeacherPassword(teacherID : number){
    const [rows] = await pool.query<(PasswordRow & RowDataPacket)[]>(`SELECT PASSWORD FROM Teachers WHERE TID=?;`,[teacherID]);
    return rows[0]?.PASSWORD;
}

export async function getUserPassword(userID : number, userType : "Student" | "Teacher"){
    if(userType === "Teacher") return getTeacherPassword(userID);

    return getStudentPassword(userID);
}
