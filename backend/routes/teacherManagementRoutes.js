import express from "express";

import {addTeacherController, editTeacherController, getTeachersController, getTeacherController, removeTeacherController} from "../controllers/teacherManagementControllers.js";

import {authenticateToken} from "../middleware/authenticateToken.js";
import {validateParameters,validateTeacherCredentials} from "../middleware/inputValidation.js";
import {isSecretary} from "../middleware/userType.js";


const router = express.Router();

/**
 * @openapi
 * /teachers:
 *   put:
 *     tags: [Secretary - Teacher Management]
 *     summary: Add A New Teacher
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [teacherName, teacherSurname, teacherPWD]
 *             properties:
 *               teacherName: {type: string}
 *               teacherSurname: {type: string}
 *               teacherPWD: {type: string}
 *     responses:
 *       200:
 *         description: Teacher Added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *                 teacherID: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Teacher Credentials Failed Validation
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
router.put("/teachers",authenticateToken,isSecretary,validateTeacherCredentials,addTeacherController);

/**
 * @openapi
 * /teachers:
 *   get:
 *     tags: [Secretary - Teacher Management]
 *     summary: Get All Teachers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Teachers Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *                 teachers:
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
 *       404:
 *         description: No Teachers Found
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
router.get("/teachers",authenticateToken,isSecretary,getTeachersController);

/**
 * @openapi
 * /teachers/{teacherID}:
 *   get:
 *     tags: [Secretary - Teacher Management]
 *     summary: Get A Single Teacher By ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric teacher ID
 *     responses:
 *       200:
 *         description: Teacher Retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *                 teacher:
 *                   type: object
 *                   properties:
 *                     ID: {type: string}
 *                     Name: {type: string}
 *                     Surname: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Teacher ID Failed Validation
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
 *         description: Teacher Not Found
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
router.get("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,getTeacherController);

/**
 * @openapi
 * /teachers/{teacherID}:
 *   patch:
 *     tags: [Secretary - Teacher Management]
 *     summary: Edit An Existing Teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric teacher ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [teacherName, teacherSurname, teacherPWD]
 *             properties:
 *               teacherName: {type: string}
 *               teacherSurname: {type: string}
 *               teacherPWD: {type: string}
 *     responses:
 *       200:
 *         description: Teacher Edited
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
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
 *         description: User Or Token Not Found, Or Teacher ID Or Input Failed Validation
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
router.patch("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,validateTeacherCredentials,editTeacherController);

/**
 * @openapi
 * /teachers/{teacherID}:
 *   delete:
 *     tags: [Secretary - Teacher Management]
 *     summary: Remove An Existing Teacher
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: teacherID
 *         required: true
 *         schema: {type: integer}
 *         description: Numeric teacher ID
 *     responses:
 *       200:
 *         description: Teacher Removed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       401:
 *         description: User Or Token Not Found, Or Teacher ID Failed Validation
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
 *         description: Teacher Not Found
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
router.delete("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,removeTeacherController);

export default router;
