import joi from "joi";

export const userSchema = joi.object({
  userID: joi.string().pattern(/[0-9]{6}/).required(),

  userPWD: joi.string().min(4).max(10).required(),

  userType: joi.string().valid("student", "teacher", "secretary").required()
});

export const parameterSchema = joi.number().integer().positive();
