import joi from "joi";

export const idSchema = joi.string().pattern(/^[0-9]{6}/).required();

const pwdSchema = joi.string().min(3).max(20).required();

const userTypeSchema = joi.string().valid("Student", "Teacher", "Secretary").required();

const nameSchema = joi.string().pattern(/[a-zA-Z ]+/).min(4).max(30).required();

const yearSchema = joi.number().integer().positive().min(2000).max(parseInt(new Date().getFullYear())).required();

const semesterSchema = joi.number().integer().positive().max(12).required();

export const gradeSchema = joi.number().min(0).max(10).required();

export const paramSchema = joi.number().integer().positive().required();

export const loginSchema = joi.object({
  userID: idSchema,
  userPWD: pwdSchema,
  userType: userTypeSchema
});

export const gradingSchema = joi.object({
  grade : gradeSchema
});

export const teacherCredentialsSchema = joi.object({
  teacherName : nameSchema,
  teacherSurname : nameSchema,
  teacherPWD : pwdSchema
});

export const studentAddCredentialsSchema = joi.object({
  studentName : nameSchema,
  studentSurname : nameSchema,
  studentPWD : pwdSchema,
  studentEnrollmentYear : yearSchema
});

export const studentEditCredentialsSchema = joi.object({
  studentName : nameSchema,
  studentSurname : nameSchema,
  studentPWD : pwdSchema,
});

export const courseSchema = joi.object({
  courseName: nameSchema,
  courseSemester: semesterSchema,
  teacherID: idSchema.allow("NULL")
});

