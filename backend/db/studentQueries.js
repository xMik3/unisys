import db from "./connection.js";

export async function getRegisteredCourses(studentID){
    try{
        let courses = await db.promise().query(
            `SELECT LPAD(c.CID,6,"0") AS ID,
            c.NAME AS Name,
            c.SEMESTER AS Semester,
            a.GRADE AS Grade,
            t.NAME AS TeacherName,
            t.SURNAME AS TeacherSurname
            FROM Students s
            JOIN Attends a ON s.SID = a.SID
            JOIN Courses c ON a.CID = c.CID
            LEFT JOIN Teachers t ON c.TID = t.TID
            WHERE s.SID = ?;`,
            [studentID]
        );
        return courses[0];
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function getAvailableCourses(studentID){
    try{
        let courses = await db.promise().query(
            `SELECT LPAD(CID,6,"0") AS ID,
            NAME AS Name,
            SEMESTER AS Semester
            FROM Courses WHERE CID NOT IN(
                SELECT CID
                FROM Attends
                WHERE SID = ?
            ) AND SEMESTER <= (
                SELECT SEMESTER
                FROM Students
                WHERE SID = ?
            );`,
            [studentID,studentID]
        );
        return courses[0];
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function registerCourses(studentID,courses){
    try{
        const values = courses.map(course => [studentID, course, null]);

        return await db.promise().query(`INSERT INTO Attends (SID, CID, GRADE) VALUES ?;`,[values]);
    }
    catch(error){
        console.log(error);
        throw error;
    }
}

export async function unregisterCourse(studentID,courseID){
    try{
        return await db.promise().query(`DELETE FROM Attends WHERE SID = ? AND CID = ? AND (GRADE IS NULL OR GRADE<5);`,[studentID,courseID]);
    }
    catch(error){
        throw error;
    }
}

export async function getSemesters(studentID,courseID){
    try{
        let semesters =  await db.promise().query(
          `SELECT s.SEMESTER as studentSemester, c.SEMESTER as courseSemester
          FROM Students s, Courses c
          WHERE s.SID=? AND c.CID=?;`,
          [studentID,courseID]
        );
        return semesters[0][0];
    }
    catch(error){
        throw error;
    }
}

export async function getRegisteredCoursesCount(studentID){
    try{
        let count = await db.promise().query(
            `SELECT COUNT(CID) AS registeredCourses
            FROM Attends 
            WHERE SID=? AND (GRADE IS NULL OR GRADE < 5);
            `,
            [studentID]
        );
        return count[0][0];
    }
    catch(error){
        throw error;
    }
}