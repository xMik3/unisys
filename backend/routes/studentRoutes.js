import express from "express";
import {getRegisteredCoursesController,registerCoursesController,removeCourseController,getAvailableCoursesController} from "../controllers/studentControllers.js";

import { authenticateToken } from "../middleware/authenticateToken.js";
import { validateParameters,validateCourses } from "../middleware/inputValidation.js";
import { isStudent } from "../middleware/userType.js";

const router = express.Router();

/**
 * @openapi
 * /registeredCourses:
 *   get:
 *     tags: [Student]
 *     summary: Get The Courses The Authenticated Student Is Registered To
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Registered Courses Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Registered Courses Retrieved"}
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string, example: "000013"}
 *                       Name: {type: string, example: "Software Engineering"}
 *                       Semester: {type: integer, example: 3}
 *                       Grade: {type: number, nullable: true, example: 8.5}
 *                       TeacherName: {type: string, example: "Ioannis"}
 *                       TeacherSurname: {type: string, example: "Giannakopoulos"}
 *       401:
 *         description: No Token Provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "No token provided"}
 *       403:
 *         description: Invalid Token, Or Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Access denied"}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Database error"}
 */
router.get("/registeredCourses", authenticateToken, isStudent, getRegisteredCoursesController);

/**
 * @openapi
 * /registeredCourses:
 *   put:
 *     tags: [Student]
 *     summary: Register The Authenticated Student To A List Of Courses
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [courses]
 *             properties:
 *               courses:
 *                 type: array
 *                 items:
 *                   type: string
 *                   pattern: '^[0-9]{6}'
 *           examples:
 *             databaseSystems:
 *               summary: 'Database Systems'
 *               value: {courses: ['000012']}
 *     responses:
 *       200:
 *         description: Registered To Courses
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Registered To Courses"}
 *       400:
 *         description: Invalid Input, Or Cannot Register To More Than 7 Courses, Or Course Not Available To This Student, Or Student Already Registered To Course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Invalid Input"}
 *       401:
 *         description: No Token Provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "No token provided"}
 *       403:
 *         description: Invalid Token, Or Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Access denied"}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Database error"}
 */
router.put("/registeredCourses", authenticateToken, isStudent, validateCourses, registerCoursesController);

/**
 * @openapi
 * /registeredCourses/{courseID}:
 *   delete:
 *     tags: [Student]
 *     summary: Remove The Authenticated Student From A Registered Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema: {type: integer, example: "000012"}
 *         description: Numeric course ID
 *     responses:
 *       200:
 *         description: Removed From Course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Removed From Course"}
 *       400:
 *         description: Invalid Input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Invalid Input"}
 *       401:
 *         description: No Token Provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "No token provided"}
 *       403:
 *         description: Invalid Token, Or Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Access denied"}
 *       404:
 *         description: Student Not Enrolled In Course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Student not enrolled in course"}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Database error"}
 */
router.delete("/registeredCourses/:courseID", authenticateToken, isStudent, validateParameters, removeCourseController);

/**
 * @openapi
 * /availableCourses:
 *   get:
 *     tags: [Student]
 *     summary: Get The Courses Available For The Authenticated Student To Register To
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Available Courses Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Available Courses Retrieved"}
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string, example: "000012"}
 *                       Name: {type: string, example: "Database Systems"}
 *                       Semester: {type: integer, example: 3}
 *       401:
 *         description: No Token Provided
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "No token provided"}
 *       403:
 *         description: Invalid Token, Or Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Access denied"}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Database error"}
 */
router.get("/availableCourses", authenticateToken, isStudent, getAvailableCoursesController);

export default router;