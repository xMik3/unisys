import db from "../db/connection.js";

export function getCourses(req,res){
    let query =
    `SELECT * FROM Courses;`;

    db.query(query,(error,results)=>{
        if(error) return res.status(500).json({ error : "Database error" });

        return res.status(200).json(results);
    });
}

export function addCourse(req,res){
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;
    
    let query = 
    `INSERT INTO Courses (NAME,SEMESTER,TID) VALUES(?,?,NULL);`;

    db.query(query,[courseName,courseSemester],(error,results)=>{
        if(error) return res.status(500).json({ error : "Database error" });

        return res.status(200).json({ success : "Course added"});
    });
}

export function assignTeacher(req,res){
    let courseID = req.params.courseID;
    let teacherID = req.params.teacherID;

    let teacherQuery = 
    `SELECT * FROM Teachers WHERE TID=?;`;

    db.query(teacherQuery,[teacherID],(error,results)=>{
        if(error) return res.status(500).json( { error : "Database error" });

        if(results.length==0) return res.status(400).json( { error : "Teacher does not exist"} );
    
        let query =
        `UPDATE Courses
        SET TID = ?
        WHERE CID = ?;`;

        db.query(query,[teacherID,courseID],(error,results)=>{
            if(error) return res.status(500).json( { error : "Database error" });

            return res.status(200).json({ success : "Teacher assigned"});
        });
    });
    
}

export function editCourse(req,res){
    let courseID = req.params.courseID;
    let courseName = req.body.courseName;
    let courseSemester = req.body.courseSemester;

    let query =
    `UPDATE Courses
    SET NAME=?, SEMESTER=?
    WHERE CID=?;
    `

    db.query(query,[courseName,courseSemester,courseID],(error,results)=>{
        if(error) return res.status(500).json( { error : "Database error" });

        return res.status(200).json({ success : "Course edited"});
    });
}

export function removeCourse(req,res){
    let courseID = req.params.courseID;

    let query=
    `DELETE FROM Courses WHERE CID=?;`;

    db.query(query,[courseID],(error,results)=>{
        if(error) return res.status(500).json( { error : "Database error" });

        if(results.affectedRows == 0) return res.status(404).json({ error: "Course not found" });

        return res.status(200).json({ success : "Course removed"});
    });
}