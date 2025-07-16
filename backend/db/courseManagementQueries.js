import db from "./connection.js";

export async function getCourses(){
    try{
        let courses = await db.promise().query(`SELECT * FROM Courses;`);
        return courses[0];
    }
    catch(error){
        throw error;
    }
}

export async function addCourse(courseName,courseSemester){
    try{
        await db.promise().query(`INSERT INTO Courses (NAME,SEMESTER,TID) VALUES(?,?,NULL);`,[courseName,courseSemester]);
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