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
 *                 status: {type: string}
 *                 message: {type: string}
 *                 courseID: {type: string}
 *       400:
 *         description: Teacher Does Not Exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Course Input Failed Validation
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
 *                       TeacherID: {type: string, nullable: true}
 *                       TeacherName: {type: string, nullable: true}
 *                       TeacherSurname: {type: string, nullable: true}
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
 *         description: No Courses Found
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
 *                 status: {type: string}
 *                 message: {type: string}
 *                 course:
 *                   type: object
 *                   properties:
 *                     ID: {type: string}
 *                     Name: {type: string}
 *                     Semester: {type: integer}
 *                     TeacherID: {type: string, nullable: true}
 *                     TeacherName: {type: string, nullable: true}
 *                     TeacherSurname: {type: string, nullable: true}
 *       401:
 *         description: User Or Token Not Found, Or Course ID Failed Validation
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
 *         description: Course Not Found
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
 *                 status: {type: string}
 *                 message: {type: string}
 *       400:
 *         description: Teacher Does Not Exist, Or Course Does Not Exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Course ID Or Input Failed Validation
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
 *                 status: {type: string}
 *                 message: {type: string}
 *       400:
 *         description: Cannot Delete Course With Enrolled Students
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Course ID Failed Validation
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
 *         description: Course Not Found
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
router.delete("/courses/:courseID", authenticateToken, isSecretary, validateParameters, removeCourseController);

export default router;
