import db from "./connection.js";

export async function getStudents(year){
    try{
        let students = await db.promise().query(`
            SELECT LPAD(SID,6,"0") AS ID,
            NAME AS Name,
            SURNAME AS Surname,
            SEMESTER AS Semester,
            AVAILCOURSES AS AvailableCourses,
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

export async function getStudent(studentID){
    try{
        let student = await db.promise().query(`
            SELECT LPAD(SID,6,"0") AS ID,
            NAME AS Name,
            SURNAME AS Surname,
            SEMESTER AS Semester,
            AVAILCOURSES AS AvailableCourses,
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

export async function getStudentPassword(studentID){
    try{
        let password = await db.promise().query(`SELECT PASSWORD FROM Students WHERE SID=?;`,[studentID]);
        return password[0][0];
    }
    catch(error){
        throw error;
    }
}

export async function addStudent(studentName,studentSurname,studentPWD,studentEnrollmentYear,studentSemester){
    try{
        await db.promise().query(`INSERT INTO Students (NAME,SURNAME,SEMESTER,PASSWORD,AVAILCOURSES,ENROLLMENTYEAR) VALUES(?,?,?,?,7,?);`,[studentName,studentSurname,studentSemester,studentPWD,studentEnrollmentYear]);
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