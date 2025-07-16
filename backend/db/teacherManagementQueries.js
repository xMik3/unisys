import db from "./connection.js";

export async function getTeachers(){
    try{
        let teachers = await db.promise().query(`SELECT TID,NAME,SURNAME FROM Teachers;`);
        return teachers[0];
    }
    catch(error){
        throw error;
    }
}

export async function addTeacher(teacherName,teacherSurname,teacherPWD){
    try{
        await db.promise().query(`INSERT INTO Teachers (NAME,SURNAME,PASSWORD) VALUES(?,?,?);`,[teacherName,teacherSurname,teacherPWD]);
    }
    catch(error){
        throw error;
    }
}

export async function editTeacher(teacherName,teacherSurname,teacherPWD,teacherID){
    try{
        return await db.promise().query(
        `UPDATE Teachers
        SET NAME=?, SURNAME=?, PASSWORD=?
        WHERE TID=?;`,
        [teacherName,teacherSurname,teacherPWD,teacherID]
        );
    }
    catch(error){
        throw(error);
    }
}

export async function removeTeacher(teacherID){
    try{
        return db.promise().query(`DELETE FROM Teachers WHERE TID=?;`,[teacherID]);
    }
    catch(error){
        throw error;
    }
}