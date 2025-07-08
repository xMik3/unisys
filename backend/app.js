import express from "express";

import authRoutes from "./routes/authRoutes.js";
import studentRoutes from "./routes/studentRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";


const app = express();
app.use(express.json());

app.use(authRoutes);
app.use(studentRoutes);
app.use(teacherRoutes);

export default app;




