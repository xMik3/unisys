import express from "express";
import {getManagedCoursesController,getManagedStudentsController,gradeStudentController} from "../controllers/teacherControllers.js";

import {authenticateToken} from "../middleware/authenticateToken.js";
import {validateParameters,validateGrade} from "../middleware/inputValidation.js";
import {isTeacher} from "../middleware/userType.js";

const router = express.Router();
router.get("/managedCourses", authenticateToken, isTeacher, getManagedCoursesController);
router.get("/managedCourses/:courseID/students", authenticateToken, isTeacher, validateParameters, getManagedStudentsController);

router.patch("/managedCourses/:courseID/students/:studentID", authenticateToken, isTeacher, validateParameters, validateGrade, gradeStudentController);

export default router;