import joi from "joi";

export const loginSchema = joi.object({
  userID: joi.string().pattern(/[0-9]{6}/).required(),

  userPWD: joi.string().min(4).max(20).required(),

  userType: joi.string().valid("student", "teacher", "secretary").required()
});

export const parameterSchema = joi.number().integer().positive().required();

export const courseSchema = joi.object({
  courseName: joi.string().min(4).max(20).required(),

  courseSemester: joi.number().integer().positive().max(10).required()
});

