import express from "express";
import {getRegisteredCoursesController,registerCoursesController,removeCourseController,getAvailableCoursesController} from "../controllers/studentControllers.js";

import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateParameters,validateCourses } from "../middleware/inputValidation.js";
import { isStudent } from "../middleware/userType.js";

const router = express.Router();
router.get("/registeredCourses", authenticateToken, isStudent, getRegisteredCoursesController);

router.put("/registeredCourses", authenticateToken, isStudent, validateCourses, registerCoursesController);
router.delete("/registeredCourses/:courseID", authenticateToken, isStudent, validateParameters, removeCourseController);

router.get("/availableCourses", authenticateToken, isStudent, getAvailableCoursesController);

export default router;