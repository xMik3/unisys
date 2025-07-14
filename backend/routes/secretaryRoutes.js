import express from "express";
import {getCoursesController,addCourseController,editCourseController,assignTeacherController,removeCourseController} from "../controllers/secretaryControllers.js";

import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateParameters, validateCourseInput } from "../middleware/inputValidation.js";
import { isSecretary } from "../middleware/userType.js";

const router = express.Router();
router.get("/courses", authenticateToken, isSecretary, getCoursesController);
router.put("/courses", authenticateToken, isSecretary,  validateCourseInput, addCourseController);
router.patch("/courses/:courseID", authenticateToken, isSecretary, validateParameters, validateCourseInput, editCourseController);
router.delete("/courses/:courseID", authenticateToken, isSecretary, validateParameters, removeCourseController);
router.put("/courses/:courseID/:teacherID", authenticateToken, isSecretary, validateParameters, assignTeacherController);


export default router;