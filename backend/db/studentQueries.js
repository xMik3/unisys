import db from "./connection.js";

export async function getRegisteredCourses(studentID){
    try{
        let courses = await db.promise().query(
            `SELECT c.CID,c.NAME AS CNAME, a.GRADE, t.NAME AS TNAME, t.SURNAME AS TSURNAME
            FROM Students s
            JOIN Attends a ON s.SID = a.SID
            JOIN Courses c ON a.CID = c.CID
            JOIN Teachers t ON c.TID = t.TID
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

export async function registerCourse(studentID,courseID){
    try{
        return await db.promise().query(`INSERT INTO Attends (SID, CID, GRADE) VALUES (?, ?, NULL);`,[studentID,courseID])
    }
    catch(error){
        throw error;
    }
}

export async function unregisterCourse(studentID,courseID){
    try{
        return await db.promise().query(`DELETE FROM Attends WHERE SID = ? AND CID = ?;`,[studentID,courseID]);
    }
    catch(error){
        throw error;
    }
}