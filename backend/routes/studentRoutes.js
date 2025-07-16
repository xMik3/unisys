import express from "express";
import {getRegisteredCoursesController,registerCourseController,removeCourseController} from "../controllers/studentControllers.js";

import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateParameters } from "../middleware/inputValidation.js";
import { isStudent } from "../middleware/userType.js";

const router = express.Router();
router.get("/registeredCourses", authenticateToken, isStudent, getRegisteredCoursesController);

router.patch("/registeredCourses/:courseID", authenticateToken, isStudent, validateParameters, registerCourseController);
router.delete("/registeredCourses/:courseID", authenticateToken, isStudent, validateParameters, removeCourseController);

export default router;