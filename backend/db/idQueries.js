import db from "./connection.js";

export async function getStudentById(SID){
    try{
        let student = await db.promise().query(`SELECT * FROM Students WHERE (SID = ?);`,[SID]);
        return student[0][0];
    }
    catch(error){
        throw error;
    }
}

export async function getTeacherById(TID){
    try{
        let teacher = await db.promise().query(`SELECT * FROM Teachers WHERE (TID = ?);`,[TID]);
        return teacher[0][0];
    }
    catch(error){
        throw error;
    }
}

export async function getCourseById(CID){
    try{
        let course = await db.promise().query(`SELECT * FROM Courses WHERE (CID = ?);`,[CID]);
        return course[0][0];
    }
    catch(error){
        throw error;
    }
}