import express from "express";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import secretaryCourseRoutes from "./routes/secretaryRoutes.js";


const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(studentRoutes);
app.use(teacherRoutes);
app.use(secretaryCourseRoutes);

app.use((req,res)=>{
    return res.status(404).json({error:"Route Doesnt Exist"});
});

export default app;




