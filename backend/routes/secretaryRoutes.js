import express from "express";

import {getCoursesController, getCourseController, addCourseController,editCourseController,assignTeacherController,removeCourseController} from "../controllers/courseManagementControllers.js";
import {addTeacherController, editTeacherController, getTeachersController, getTeacherController, removeTeacherController} from "../controllers/teacherManagementControllers.js";
import {addStudentController, advanceSemesterController, editStudentController, getStudentsController, getStudentController,removeStudentController} from "../controllers/studentManagementControllers.js";

import {authenticateToken} from "../middleware/authenticateToken.js";
import {validateParameters, validateCourseInput,validateStudentAddCredentials,validateEditStudentCredentials,validateTeacherCredentials,validateYear} from "../middleware/inputValidation.js";
import {isSecretary} from "../middleware/userType.js";


const router = express.Router();
router.put("/courses", authenticateToken, isSecretary,  validateCourseInput, addCourseController);
router.get("/courses", authenticateToken, isSecretary, getCoursesController);
router.get("/courses/:courseID", authenticateToken, isSecretary,validateParameters, getCourseController);
router.patch("/courses/:courseID", authenticateToken, isSecretary, validateParameters, validateCourseInput, editCourseController);
router.delete("/courses/:courseID", authenticateToken, isSecretary, validateParameters, removeCourseController);

router.put("/courses/:courseID/:teacherID", authenticateToken, isSecretary, validateParameters, assignTeacherController);


router.put("/teachers",authenticateToken,isSecretary,validateTeacherCredentials,addTeacherController);
router.get("/teachers",authenticateToken,isSecretary,getTeachersController);
router.get("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,getTeacherController);
router.patch("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,validateTeacherCredentials,editTeacherController);
router.delete("/teachers/:teacherID",authenticateToken,isSecretary,validateParameters,removeTeacherController);


router.put("/students",authenticateToken,isSecretary,validateStudentAddCredentials,addStudentController);
router.get("/students/year/:year",authenticateToken,isSecretary,validateParameters,validateYear,getStudentsController);
router.get("/students/:studentID",authenticateToken,isSecretary,validateParameters,getStudentController);
router.patch("/students/:studentID",authenticateToken,isSecretary,validateParameters,validateEditStudentCredentials,editStudentController);
router.delete("/students/:studentID",authenticateToken,isSecretary,validateParameters,removeStudentController);

router.post("/students",authenticateToken,isSecretary,advanceSemesterController)

export default router;