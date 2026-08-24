import express from "express";

import {getCoursesController, getCourseController, addCourseController,editCourseController,removeCourseController} from "../controllers/courseManagementControllers.js";

import {authenticateToken} from "../middleware/authenticateToken.js";
import {validateParameters, validateCourseInput} from "../middleware/inputValidation.js";
import {isSecretary} from "../middleware/userType.js";


const router = express.Router();

/**
 * @openapi
 * /courses:
 *   put:
 *     tags: [Secretary - Course Management]
 *     summary: Add A New Course
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [courseName, courseSemester, teacherID]
 *             properties:
 *               courseName: {type: string}
 *               courseSemester: {type: integer}
 *               teacherID: {type: string, nullable: true}
 *     responses:
 *       200:
 *         description: Course Added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Course added"}
 *                 courseID: {type: string, example: "000013"}
 *       400:
 *         description: Invalid Input, Or Teacher Does Not Exist
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
router.put("/courses", authenticateToken, isSecretary,  validateCourseInput, addCourseController);

/**
 * @openapi
 * /courses:
 *   get:
 *     tags: [Secretary - Course Management]
 *     summary: Get All Courses
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Courses Sent
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Courses Sent"}
 *                 courses:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string, example: "000013"}
 *                       Name: {type: string, example: "Software Engineering"}
 *                       Semester: {type: integer, example: 3}
 *                       TeacherID: {type: string, nullable: true, example: "000001"}
 *                       TeacherName: {type: string, nullable: true, example: "Ioannis"}
 *                       TeacherSurname: {type: string, nullable: true, example: "Giannakopoulos"}
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
 *         description: No Courses Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "No courses found"}
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
router.get("/courses", authenticateToken, isSecretary, getCoursesController);

/**
 * @openapi
 * /courses/{courseID}:
 *   get:
 *     tags: [Secretary - Course Management]
 *     summary: Get A Single Course By ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric course ID
 *     responses:
 *       200:
 *         description: Course Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Course Retrieved"}
 *                 course:
 *                   type: object
 *                   properties:
 *                     ID: {type: string, example: "000013"}
 *                     Name: {type: string, example: "Software Engineering"}
 *                     Semester: {type: integer, example: 3}
 *                     TeacherID: {type: string, nullable: true, example: "000001"}
 *                     TeacherName: {type: string, nullable: true, example: "Ioannis"}
 *                     TeacherSurname: {type: string, nullable: true, example: "Giannakopoulos"}
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
 *         description: Course Not Found
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
router.get("/courses/:courseID", authenticateToken, isSecretary,validateParameters, getCourseController);

/**
 * @openapi
 * /courses/{courseID}:
 *   patch:
 *     tags: [Secretary - Course Management]
 *     summary: Edit An Existing Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric course ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [courseName, courseSemester, teacherID]
 *             properties:
 *               courseName: {type: string}
 *               courseSemester: {type: integer}
 *               teacherID: {type: string, nullable: true}
 *     responses:
 *       200:
 *         description: Course Edited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Course edited"}
 *       400:
 *         description: Invalid Input, Or Teacher Does Not Exist, Or Course Does Not Exist
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
router.patch("/courses/:courseID", authenticateToken, isSecretary, validateParameters, validateCourseInput, editCourseController);

/**
 * @openapi
 * /courses/{courseID}:
 *   delete:
 *     tags: [Secretary - Course Management]
 *     summary: Remove An Existing Course
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric course ID
 *     responses:
 *       200:
 *         description: Course Removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Course removed"}
 *       400:
 *         description: Invalid Input, Or Cannot Delete Course With Enrolled Students
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
 *         description: Course Not Found
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
router.delete("/courses/:courseID", authenticateToken, isSecretary, validateParameters, removeCourseController);

export default router;
