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
 *                 status: {type: string}
 *                 message: {type: string}
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string}
 *                       Name: {type: string}
 *                       Semester: {type: integer}
 *                       Grade: {type: number, nullable: true}
 *                       TeacherName: {type: string}
 *                       TeacherSurname: {type: string}
 *       401:
 *         description: User Or Token Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       403:
 *         description: Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
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
 *                 status: {type: string}
 *                 message: {type: string}
 *       400:
 *         description: Course Limit Exceeded, Or Student Already Registered To A Course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Courses Failed Validation
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       403:
 *         description: Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
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
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       403:
 *         description: Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       404:
 *         description: Student Not Enrolled In Course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
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
 *                 status: {type: string}
 *                 message: {type: string}
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string}
 *                       Name: {type: string}
 *                       Semester: {type: integer}
 *       401:
 *         description: User Or Token Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       403:
 *         description: Access Denied
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       500:
 *         description: Database Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 */
router.get("/availableCourses", authenticateToken, isStudent, getAvailableCoursesController);

export default router;