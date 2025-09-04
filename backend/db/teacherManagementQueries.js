import db from "./connection.js";

export async function getTeachers(){
    try{
        let teachers = await db.promise().query(`
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

export async function getTeacher(teacherID){
    try{
        let teacher = await db.promise().query(`
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

export async function getTeacherPassword(teacherID){
    try{
        let password = await db.promise().query(`SELECT PASSWORD FROM Teachers WHERE TID=?;`,[teacherID]);
        return password[0][0];
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