import express from "express";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import secretaryCourseRoutes from "./routes/courseManagementRoutes.js";
import secretaryStudentRoutes from "./routes/studentManagementRoutes.js";
import secretaryTeacherRoutes from "./routes/teacherManagementRoutes.js";
import swaggerRoutes from "./routes/swaggerRoutes.js";

const app = express();
app.use(express.json());

app.use(swaggerRoutes);
app.use(authRoutes);
app.use(studentRoutes);
app.use(teacherRoutes);
app.use(secretaryCourseRoutes);
app.use(secretaryStudentRoutes);
app.use(secretaryTeacherRoutes);

app.use((req,res)=>{
    return res.status(404).json({error:"Route Doesnt Exist"});
});

export default app;




