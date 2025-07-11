import express from "express";
import {getRegisteredCourses,registerCourse,removeCourse} from "../controllers/studentControllers.js";

import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateParameters } from "../middleware/inputValidation.js";
import { isStudent } from "../middleware/checkUserType.js";

const router = express.Router();
router.get("/registeredCourses", authenticateToken, isStudent, getRegisteredCourses);
router.patch("/registeredCourses/:courseID", authenticateToken, isStudent, validateParameters, registerCourse);
router.delete("/registeredCourses/:courseID", authenticateToken, isStudent, validateParameters, removeCourse);

export default router;