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
 *     summary: Get the courses managed by the authenticated teacher
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
 *                 status: {type: string}
 *                 message: {type: string}
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string}
 *                       Name: {type: string }
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
router.get("/managedCourses", authenticateToken, isTeacher, getManagedCoursesController);

/**
 * @openapi
 * /managedCourses/{courseID}/students:
 *   get:
 *     tags: [Teacher]
 *     summary: Get the ungraded students of a course managed by the authenticated teacher
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
 *         description: Managed students retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string}
 *                       Name: {type: string}
 *                       Surname: {type: string}
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
router.get("/managedCourses/:courseID/students", authenticateToken, isTeacher, validateParameters, getManagedStudentsController);

/**
 * @openapi
 * /managedCourses/{courseID}/students/{studentID}:
 *   patch:
 *     tags: [Teacher]
 *     summary: Grade a student in a course managed by the authenticated teacher, teachers can grade the same student more than once.
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
 *                 status: {type: string}
 *                 message: {type: string}
 *       400:
 *         description: Grade failed validation
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
router.patch("/managedCourses/:courseID/students/:studentID", authenticateToken, isTeacher, validateParameters, validateGrade, gradeStudentController);

export default router;