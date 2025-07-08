import express from "express";
import {getManagedCourses,getManagedStudents,gradeStudent} from "../controllers/teacherControllers.js";

import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateParameters } from "../middleware/inputValidation.js";
import { isTeacher } from "../middleware/checkUserType.js";

const router = express.Router();
router.get("/managedCourses", authenticateToken, isTeacher, getManagedCourses);
router.get("/managedCourses/:courseID/students", authenticateToken, isTeacher, validateParameters, getManagedStudents);
router.patch("/managedCourses/:courseID/students/:studentID", authenticateToken, isTeacher, validateParameters, gradeStudent);

export default router;