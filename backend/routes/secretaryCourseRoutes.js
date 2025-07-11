import express from "express";
import {getCourses,addCourse,editCourse,assignTeacher,removeCourse} from "../controllers/secretaryCourseControllers.js";

import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateParameters, validateCourseInput } from "../middleware/inputValidation.js";
import { isSecretary } from "../middleware/checkUserType.js";

const router = express.Router();
router.get("/courses", authenticateToken, isSecretary, getCourses);
router.put("/courses", authenticateToken, isSecretary,  validateCourseInput, addCourse);
router.patch("/courses/:courseID", authenticateToken, isSecretary, validateParameters, validateCourseInput, editCourse);
router.delete("/courses/:courseID", authenticateToken, isSecretary, validateParameters, removeCourse);
router.put("/courses/:courseID/:teacherID", authenticateToken, isSecretary, validateParameters, assignTeacher);


export default router;