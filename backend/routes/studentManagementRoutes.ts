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
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Student added"}
 *                 studentID: {type: string, example: "000006"}
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
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Students Retrieved"}
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       ID: {type: string, example: "000005"}
 *                       Name: {type: string, example: "Vasileios"}
 *                       Surname: {type: string, example: "Markakis"}
 *                       Semester: {type: integer, example: 3}
 *                       EnrollmentYear: {type: integer, example: 2023}
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
 *         description: No Students Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "No students found"}
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
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Student Retrieved"}
 *                 student:
 *                   type: object
 *                   properties:
 *                     ID: {type: string, example: "000005"}
 *                     Name: {type: string, example: "Vasileios"}
 *                     Surname: {type: string, example: "Markakis"}
 *                     Semester: {type: integer, example: 3}
 *                     EnrollmentYear: {type: integer, example: 2023}
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
 *         description: Student Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Student not found"}
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
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Student edited"}
 *       400:
 *         description: Invalid Input, Or Student Does Not Exist
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
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Student removed"}
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
 *         description: Student Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Student not found"}
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
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Semester advanced"}
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
router.post("/students",authenticateToken,isSecretary,advanceSemesterController)

export default router;
