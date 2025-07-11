import db from "../db/connection.js";

export function getManagedCourses(req,res){
  let userID = req.userID;

  let query = `SELECT * FROM Courses WHERE TID = ?;`;
  
  db.query(query,[userID],(error,results)=>{
    if(error) return res.status(500).json({ error: "Database Error" });

    return res.status(200).json(results);
   });
}

export function getManagedStudents(req,res){
  let courseID = req.params.courseID;
  let userID = req.userID;
  
  let query = 
  `SELECT s.SID,s.NAME,s.SURNAME
  FROM Students s
  JOIN Attends a ON s.SID = a.SID
  JOIN Courses c ON a.CID = c.CID
  WHERE c.CID = ? AND c.TID = ? AND a.GRADE IS NULL;`;

  db.query(query, [courseID, userID], (error,results)=>{
    if(error) return res.status(500).json({ error: "Database Error" });

    return res.status(200).json(results);
  });
}

export function gradeStudent(req,res){
  let courseID = req.params.courseID;
  let studentID = req.params.studentID;
  let userID = req.userID;

  let grade = req.body.grade;
  if(grade<0 || grade>10) return res.status(400).json({ error : "Incorrect Grade"});

  let query = 
  `UPDATE Attends a
  JOIN Courses c ON a.CID = c.CID
  SET a.GRADE = ?
  WHERE a.SID = ? AND a.CID = ? AND c.TID = ?;`;

  db.query(query, [grade,studentID,courseID,userID],(error,results)=>{
    if(error) return res.status(500).json({ error: "Database Error" });

    if (results.affectedRows === 0) return res.status(403).json({ error: "You do not have permission to grade this student" });

    return res.status(200).json({ success : "Student graded" });
  });
}

