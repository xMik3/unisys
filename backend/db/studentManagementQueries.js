import db from "./connection.js";

export async function getStudents(){
    try{
        let students = await db.promise().query(`SELECT SID,NAME,SURNAME,SEMESTER,AVAILCOURSES FROM Students;`);
        return students[0];
    }
    catch(error){
        throw error;
    }
}

export async function addStudent(studentName,studentSurname,studentPWD){
    try{
        await db.promise().query(`INSERT INTO Students (NAME,SURNAME,SEMESTER,PASSWORD,AVAILCOURSES) VALUES(?,?,1,?,7);`,[studentName,studentSurname,studentPWD]);
    }
    catch(error){
        throw error;
    }
}

export async function editStudent(studentName,studentSurname,studentPWD,studentID){
    try{
        return await db.promise().query(
        `UPDATE Students
        SET NAME=?, SURNAME=?, PASSWORD=?
        WHERE SID=?;`,
        [studentName,studentSurname,studentPWD,studentID]
        );
    }
    catch(error){
        throw error;
    }
}

export async function removeStudent(studentID){
    try{
        return db.promise().query(`DELETE FROM Students WHERE SID=?;`,[studentID]);
    }
    catch(error){
        throw error;
    }
}

export async function advanceSemester(){
    try{
        await db.promise().query(
        `UPDATE Students 
        SET SEMESTER = SEMESTER + 1;`);
    }
    catch(error){
        throw error;
    }
}