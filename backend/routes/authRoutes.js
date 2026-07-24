import express from "express";

import {validateLoginInput} from "../middleware/inputValidation.js";
import {loginController} from "../controllers/authControllers.js";

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
 *                 status: {type: string}
 *                 message: {type: string}
 *                 token: {type: string}
 *       401:
 *         description: Invalid Input, Or User Not Found, Or Invalid Credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 *       500:
 *         description: Database Error, Or Authentication Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: {type: string}
 *                 message: {type: string}
 */
router.post("/login", validateLoginInput, loginController);

export default router;
