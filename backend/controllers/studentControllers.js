import db from "../db/connection.js"

export function getRegisteredCourses(req,res){
  let userID = req.userID;

  let query = 
  `SELECT c.CID,c.NAME, a.GRADE, s.AVAILCOURSES
  FROM Students s
  JOIN Attends a ON s.SID = a.SID
  JOIN Courses c ON a.CID = c.CID
  WHERE s.SID = ?`;

  db.query(query, [userID], (error,results)=>{
    if(error) return res.status(500).send("Database error");

    return res.status(200).json(results);
  });
}

export function registerCourse(req,res){
  let courseID = req.params.courseID;
  let userID = req.userID;

  let query = `INSERT INTO Attends (SID, CID, GRADE) VALUES (?, ?, NULL)`;

  db.query(query, [userID,courseID], (error, results) => {
    if (error) return res.status(400).json({ error : "Course does not exist."});

    return res.status(200).send("Registered To Course");
  });
}

export function removeCourse(req,res){
  let courseID = req.params.courseID;
  let userID = req.userID;

  let query = `DELETE FROM Attends WHERE SID = ? AND CID = ?`;

  db.query(query, [userID,courseID],(error,result)=>{
    if(error) return res.status(500).send("Database error");

    if (result.affectedRows === 0) return res.status(404).json({ error: "Course not found" });

    return res.status(200).send("Removed From Course");
  });
}