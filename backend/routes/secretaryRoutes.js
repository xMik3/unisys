import express from "express";

import {getCoursesController, addCourseController,editCourseController,assignTeacherController,removeCourseController} from "../controllers/courseManagementControllers.js";
import {addTeacherController, editTeacherController, getTeachersController, removeTeacherController} from "../controllers/teacherManagementControllers.js";
import {addStudentController, advanceSemesterController, editStudentController, getStudentsController, removeStudentController} from "../controllers/studentManagementControllers.js";

import {authenticateToken} from "../middleware/authenticateToken.js";
import {validateParameters, validateCourseInput,validateUserCredentials} from "../middleware/inputValidation.js";
import {isSecretary} from "../middleware/userType.js";


const router = express.Router();
router.get("/courses", authenticateToken, isSecretary, getCoursesController);
router.put("/courses", authenticateToken, isSecretary,  validateCourseInput, addCourseController);
router.patch("/courses/:courseID", authenticateToken, isSecretary, validateParameters, validateCourseInput, editCourseController);
router.delete("/courses/:courseID", authenticateToken, isSecretary, validateParameters, removeCourseController);

router.put("/courses/:courseID/:teacherID", authenticateToken, isSecretary, validateParameters, assignTeacherController);


router.get("/teachers",authenticateToken,isSecretary,getTeachersController);
router.put("/teachers",authenticateToken,isSecretary,validateUserCredentials,addTeacherController);
router.patch("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,validateUserCredentials,editTeacherController);
router.delete("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,removeTeacherController);


router.get("/students",authenticateToken,isSecretary,getStudentsController);
router.put("/students",authenticateToken,isSecretary,validateUserCredentials,addStudentController);
router.patch("/students/:studentID",authenticateToken,isSecretary,validateParameters,validateUserCredentials,editStudentController);
router.delete("/students/:studentID",authenticateToken,isSecretary,validateParameters,removeStudentController);

router.post("/students",authenticateToken,isSecretary,advanceSemesterController)

export default router;