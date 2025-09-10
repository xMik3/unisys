import db from "./connection.js";

export async function getCourses(){
    try{
        let courses = await db.promise().query(`
            SELECT LPAD(c.CID,6,"0") AS ID,
            c.NAME AS Name,
            c.SEMESTER AS Semester,
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

export async function getCourse(courseID){
    try{
        let course = await db.promise().query(`
            SELECT LPAD(c.CID,6,"0") AS ID,
            c.NAME AS Name,
            c.SEMESTER AS Semester,
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

export async function addCourse(courseName,courseSemester){
    try{
        const [result] = await db.promise().query(`INSERT INTO Courses (NAME,SEMESTER,TID) VALUES(?,?,NULL);`,[courseName,courseSemester]);
        return String(result.insertId).padStart(6,'0');
    }
    catch(error){
        throw error;
    }
}

export async function editCourse(courseName,courseSemester,courseID){
    try{
        return await db.promise().query(
        `UPDATE Courses
        SET NAME=?, SEMESTER=?
        WHERE CID=?;`,
        [courseName,courseSemester,courseID]
        );
    }
    catch(error){
        throw(error);
    }
}

export async function removeCourse(courseID){
    try{
        let attends = await db.promise().query(`SELECT * FROM Attends WHERE CID=?;`,[courseID]);
        if(attends[0].length>0) throw new Error("Cannot delete course with enrolled students");
        
        return db.promise().query(`DELETE FROM Courses WHERE CID=?;`,[courseID]);
    }
    catch(error){
        throw error;
    }
}

export async function assignTeacher(teacherID,courseID){
    try{
        return await db.promise().query(
            `UPDATE Courses
            SET TID = ?
            WHERE CID = ?;`,
            [teacherID,courseID]
        );
    }
    catch(error){
        throw error;
    }
}