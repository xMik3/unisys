import express from 'express';
import mysql from 'mysql2';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const port = 3000;

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"]; 
  
  const token = authHeader && authHeader.split(" ")[1];
  if (!token){
    return res.status(401).json({ error: 'No token provided' });
  }

  jwt.verify(token, process.env.JWT, (error, user) => {
    if (error){
      return res.status(403).json({ error: "Invalid token" });
    }

    req.userID = user.userID;
    req.userType = user.userType;
    next();
  });
}

function validateLoginInputs(req,res,next){
  if(!req.body.userID || !req.body.userPWD || !req.body.userType){
    return res.status(401).json({ error: "Invalid Inputs"});
  }
  next();
}


//login
app.post("/login", validateLoginInputs, async (req,res)=>{

  const userID = req.body.userID;
  const userPWD = req.body.userPWD;
  const userType = req.body.userType;

  if(userType === "secretary" && userPWD === "chlorine" ){
      const token = generateToken(userID,userType);
      return res.json(token);
  }

  let query = getQuery(userType);
  if(!query){
    return res.status(400).json({ error: "Invalid user type" });
  }
  
  db.query(query,[userID],(error,results)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: "Database error" });
    }

    if (!results[0]){
      return res.status(401).json({ error: "User not found" });
    }

    if(userPWD !== results[0].PASSWORD){
      return res.status(401).json({ error: "Invalid Credentials "});
    }

    const token = generateToken(userID,userType);
    return res.status(200).json(token);

  });

});



app.get("/managedCourses", authenticateToken, async (req, res) => {
  const userType = req.userType;
  const userID = req.userID;
  if (userType !== "teacher"){
    return res.status(403).json({ error: "Access denied" });
  }

  let query = `SELECT * FROM Courses WHERE TID = ?`;
  
  db.query(query,[userID],(error,results)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: "Database Error" });
    }

    return res.status(200).json(results);

  });

});

app.get("/managedCourses/:courseID/students", authenticateToken, async (req,res) =>{
  const courseID = req.params.courseID;

  const userType = req.userType;
  const userID = req.userID;
  if (userType !== "teacher"){
    return res.status(403).json({ error: "Access denied" });
  }

  let query = 
  `SELECT s.SID,s.NAME,s.SURNAME
  FROM Students s
  JOIN Attends a ON s.SID = a.SID
  JOIN Courses c ON a.CID = c.CID
  WHERE c.CID = ? AND c.TID = ? AND a.GRADE IS NULL`;

  db.query(query, [courseID, userID],(error,results)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: "Database Error" });
    }

    return res.status(200).json(results);

  });

});

app.patch("/managedCourses/:courseID/students/:studentID", authenticateToken, async (req,res)=>{
  const courseID = req.params.courseID;
  const studentID = req.params.studentID;

  const grade = req.body.grade;
  if(grade<0 || grade>10){
    return res.status(400).json({ error : "Incorrect Grade"});
  }


  const userType = req.userType;
  const userID = req.userID;
  if (userType !== "teacher"){
    return res.status(403).json({ error: "Access denied" });
  }


  let query = 
  `UPDATE Attends a
  JOIN Courses c ON a.CID = c.CID
  SET a.GRADE = ?
  WHERE a.SID = ? AND a.CID = ? AND c.TID = ?;`;

  db.query(query, [grade,studentID,courseID,userID],(error,results)=>{
    if(error){
      console.error(error);
      return res.status(500).json({ error: "Database Error" });
    }

    if (results.affectedRows === 0) {
      return res.status(403).json({ error: "You do not have permission to grade this student" });
    }

    return res.status(200).send("Success");
  });

});


app.get("/registeredCourses", authenticateToken, async (req,res)=>{
  const userType = req.userType;
  const userID = req.userID;
  if(userType !== "student"){
    return res.status(403).json({ error : "Access denied"});
  }

  let query =
  `SELECT c.CID,c.NAME, a.GRADE, s.AVAILCOURSES
  FROM Students s
  JOIN Attends a ON s.SID = a.SID
  JOIN Courses c ON a.CID = c.CID
  WHERE s.SID = ?`

  db.query(query, [userID],(error,results)=>{
    if(error){
      console.error(error);
      return res.status(500).send("Database error");
    }

    return res.status(200).json(results);
  });

});

app.put("/registeredCourses/:courseID", authenticateToken, async (req,res)=>{
  const courseID = req.params.courseID;

  const userType = req.userType;
  const userID = req.userID;
  if(userType !== "student"){
    return res.status(403).json({ error : "Access denied"});
  }

  const insert = "INSERT INTO Attends (SID, CID, GRADE) VALUES (?, ?, NULL)";
  const values = [userID,courseID];

  db.query(insert, values, (error, results) => {
    if (error) {
      return res.status(400).json({ error : "Course does not exist."});
    }

    return res.status(200).send("Registered To Course");
  });

});



app.delete("/registeredCourses/:courseID", authenticateToken, async (req,res)=>{
  const courseID = req.params.courseID;

  const userType = req.userType;
  const userID = req.userID;
  if(userType !== "student"){
    return res.status(403).json({ error : "Access denied"});
  }

  const del = "DELETE FROM Attends WHERE SID = ? AND CID = ?";
  db.query(del, [userID,courseID],(error,result)=>{
    if(error){
      console.error(error);
      return res.status(500).send("Database error");
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    return res.status(200).send("Removed From Course");

  });

});





//Custom Functions
function getQuery(userType) {

  if(userType === "student"){
    return `SELECT * FROM Students WHERE (SID = ?)`;
  }

  if(userType === "teacher"){
    return `SELECT * FROM Teachers WHERE (TID = ?)`;
  }

  return null;

}

function generateToken(userID,userType) {
  return jwt.sign(
    {
      userID: userID,
      userType: userType,
    },
    process.env.JWT,
    { expiresIn: '2h' }
  );
}


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
