import express from "express";
import {getManagedCoursesController,getManagedStudentsController,gradeStudentController} from "../controllers/teacherControllers.js";

import {authenticateToken} from "../middleware/authenticateToken.js";
import {validateParameters,validateGrade} from "../middleware/inputValidation.js";
import {isTeacher} from "../middleware/userType.js";

const router = express.Router();

/**
 * @openapi
 * /managedCourses:
 *   get:
 *     tags: [Teacher]
 *     summary: Get The Courses Managed By The Authenticated Teacher
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Managed Courses Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Managed Courses Retrieved"}
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string, example: "000013"}
 *                       Name: {type: string, example: "Software Engineering" }
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
 *                 message: {type: string, example: "Database Error"}
 */
router.get("/managedCourses", authenticateToken, isTeacher, getManagedCoursesController);

/**
 * @openapi
 * /managedCourses/{courseID}/students:
 *   get:
 *     tags: [Teacher]
 *     summary: Get The Ungraded Students Of A Course Managed By The Authenticated Teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema: {type: integer, example: "000005"}
 *         description: Numeric course ID
 *     responses:
 *       200:
 *         description: Managed Students Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Managed Students Retrieved"}
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string, example: "000005"}
 *                       Name: {type: string, example: "Vasileios"}
 *                       Surname: {type: string, example: "Markakis"}
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
router.get("/managedCourses/:courseID/students", authenticateToken, isTeacher, validateParameters, getManagedStudentsController);

/**
 * @openapi
 * /managedCourses/{courseID}/students/{studentID}:
 *   patch:
 *     tags: [Teacher]
 *     summary: Grade A Student In A Course Managed By The Authenticated Teacher, Teachers Can Grade The Same Student More Than Once.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema: { type: integer, example: "000005" }
 *         description: Numeric course ID
 *       - in: path
 *         name: studentID
 *         required: true
 *         schema: { type: integer, example: "000002"}
 *         description: Numeric student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [grade]
 *             properties:
 *               grade:
 *                 type: number
 *                 minimum: 0
 *                 maximum: 10
 *     responses:
 *       200:
 *         description: Student graded
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Student graded"}
 *       400:
 *         description: Invalid Input, Or Incorrect Grade
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Incorrect Grade"}
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
 *         description: Course Not Found, Or Student Not Enrolled In Course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Course not found"}
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
router.patch("/managedCourses/:courseID/students/:studentID", authenticateToken, isTeacher, validateParameters, validateGrade, gradeStudentController);

export default router;