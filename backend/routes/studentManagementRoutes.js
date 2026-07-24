import express from "express";

import {addStudentController, advanceSemesterController, editStudentController, getStudentsController, getStudentController,removeStudentController} from "../controllers/studentManagementControllers.js";

import {authenticateToken} from "../middleware/authenticateToken.js";
import {validateParameters,validateStudentAddCredentials,validateEditStudentCredentials,validateYear} from "../middleware/inputValidation.js";
import {isSecretary} from "../middleware/userType.js";


const router = express.Router();

/**
 * @openapi
 * /students:
 *   put:
 *     tags: [Secretary - Student Management]
 *     summary: Add A New Student
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [studentName, studentSurname, studentPWD, studentEnrollmentYear]
 *             properties:
 *               studentName: {type: string}
 *               studentSurname: {type: string}
 *               studentPWD: {type: string}
 *               studentEnrollmentYear: {type: integer}
 *     responses:
 *       200:
 *         description: Student Added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *                 studentID: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Student Credentials Failed Validation
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
router.put("/students",authenticateToken,isSecretary,validateStudentAddCredentials,addStudentController);

/**
 * @openapi
 * /students/year/{year}:
 *   get:
 *     tags: [Secretary - Student Management]
 *     summary: Get All Students Enrolled In A Given Year
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: year
 *         required: true
 *         schema: {type: integer}
 *         description: Enrollment year
 *     responses:
 *       200:
 *         description: Students Retrieved
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
 *                       Semester: {type: integer}
 *                       EnrollmentYear: {type: integer}
 *       401:
 *         description: User Or Token Not Found, Or Year Failed Validation
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
 *         description: No Students Found
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
router.get("/students/year/:year",authenticateToken,isSecretary,validateYear,getStudentsController);

/**
 * @openapi
 * /students/{studentID}:
 *   get:
 *     tags: [Secretary - Student Management]
 *     summary: Get A Single Student By ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric student ID
 *     responses:
 *       200:
 *         description: Student Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *                 student:
 *                   type: object
 *                   properties:
 *                     ID: {type: string}
 *                     Name: {type: string}
 *                     Surname: {type: string}
 *                     Semester: {type: integer}
 *                     EnrollmentYear: {type: integer}
 *       401:
 *         description: User Or Token Not Found, Or Student ID Failed Validation
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
 *         description: Student Not Found
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
router.get("/students/:studentID",authenticateToken,isSecretary,validateParameters,getStudentController);

/**
 * @openapi
 * /students/{studentID}:
 *   patch:
 *     tags: [Secretary - Student Management]
 *     summary: Edit An Existing Student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric student ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [studentName, studentSurname, studentPWD]
 *             properties:
 *               studentName: {type: string}
 *               studentSurname: {type: string}
 *               studentPWD: {type: string}
 *     responses:
 *       200:
 *         description: Student Edited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       400:
 *         description: Student Does Not Exist
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Student ID Or Input Failed Validation
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
router.patch("/students/:studentID",authenticateToken,isSecretary,validateParameters,validateEditStudentCredentials,editStudentController);

/**
 * @openapi
 * /students/{studentID}:
 *   delete:
 *     tags: [Secretary - Student Management]
 *     summary: Remove An Existing Student
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: studentID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric student ID
 *     responses:
 *       200:
 *         description: Student Removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Student ID Failed Validation
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
 *         description: Student Not Found
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
router.delete("/students/:studentID",authenticateToken,isSecretary,validateParameters,removeStudentController);

/**
 * @openapi
 * /students:
 *   post:
 *     tags: [Secretary - Student Management]
 *     summary: Advance The Semester For All Students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Semester Advanced
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
router.post("/students",authenticateToken,isSecretary,advanceSemesterController)

export default router;
