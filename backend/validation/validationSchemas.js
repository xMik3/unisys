import joi from "joi";

const idSchema = joi.string().pattern(/^[0-9]{6}/).required();

const pwdSchema = joi.string().min(4).max(20).required();

const userTypeSchema = joi.string().valid("student", "teacher", "secretary").required();

const nameSchema = joi.string().pattern(/[a-zA-Z ]+/).min(4).max(20).required();

const semesterSchema = joi.number().integer().positive().max(10).required();

export const gradeSchema = joi.number().min(0).max(10).required();

export const paramSchema = joi.number().integer().positive().required();

export const loginSchema = joi.object({
  userID: idSchema,
  userPWD: pwdSchema,
  userType: userTypeSchema
}).required();

export const gradingSchema = joi.object({
  grade : gradeSchema
}).required();

export const userCredentialsSchema = joi.object({
  userName : nameSchema,
  userSurname : nameSchema,
  userPWD : pwdSchema
}).required();

export const courseSchema = joi.object({
  courseName: nameSchema,
  courseSemester: semesterSchema
}).required();

