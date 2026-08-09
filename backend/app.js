import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";
import secretaryCourseRoutes from "./routes/courseManagementRoutes.js";
import secretaryStudentRoutes from "./routes/studentManagementRoutes.js";
import secretaryTeacherRoutes from "./routes/teacherManagementRoutes.js";
import swaggerRoutes from "./routes/swaggerRoutes.js";

import {globalLimiter} from "./middleware/rateLimit.js";

const allowedOrigins = (process.env.CORS_ORIGIN ?? "").split(",").map(origin => origin.trim()).filter(Boolean);

const app = express();
app.set("trust proxy",1);
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(globalLimiter);

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




