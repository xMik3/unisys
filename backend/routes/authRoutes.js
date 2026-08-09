import express from "express";

import {validateLoginInput} from "../middleware/inputValidation.js";
import {loginController} from "../controllers/authControllers.js";
import {loginLimiter} from "../middleware/rateLimit.js";

const router = express.Router();

/**
 * @openapi
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Authenticate A User And Return A JWT
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [userID, userPWD, userType]
 *             properties:
 *               userID: {type: string}
 *               userPWD: {type: string}
 *               userType: {type: string,enum: [Student, Teacher, Secretary]}
 *           examples:
 *             student:
 *               summary: 'Demo Student (Vasileios Markakis)'
 *               value: { userID: '000005', userPWD: 'demoStudentPassword', userType: 'Student' }
 *             teacher:
 *               summary: 'Demo Teacher (Ioannis Giannakopoulos)'
 *               value: { userID: '000001', userPWD: 'demoTeacherPassword', userType: 'Teacher' }
 *     responses:
 *       200:
 *         description: Login Successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "success"}
 *                 message: {type: string, example: "Login Successful"}
 *                 token: {type: string, example: "eySajsWsla..."}
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
 *         description: Incorrect Credentials, Or User Not Found, Or Invalid Credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Incorrect Credentials"}
 *       500:
 *         description: Database Error, Or Authentication Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string, example: "error"}
 *                 message: {type: string, example: "Database error"}
 */
router.post("/login", loginLimiter, validateLoginInput, loginController);

export default router;
