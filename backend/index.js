const express = require('express');
const mysql = require('mysql2');

const app = express();
const port = 3000;

let db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});


app.get('/', (req, res) => {

  db.query("SELECT * FROM Teachers",(err,results)=>{
    
    if(err){
      console.error(err);
      res.status(500).send("Database error");
    }
    else{
      res.json(results);
    }

  });

});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});