import {idSchema,courseSchema, gradingSchema, loginSchema, paramSchema,teacherCredentialsSchema,studentAddCredentialsSchema,studentEditCredentialsSchema} from "../validation/validationSchemas.js";

export function validateLoginInput(req,res,next){

  const {error,value} = loginSchema.validate(req.body);
  
  if(error) return res.status(400).json({ status:"error", message: "Invalid Input"});

  next();
}

export function validateParameters(req,res,next){

  for(const element in req.params){

    const {error,value} = idSchema.validate(req.params[element]);
  
    if(error) return res.status(400).json({ status:"error", message: "Invalid Input"});

  }

  next();
}

export function validateGrade(req,res,next){

  const {error,value} = gradingSchema.validate(req.body);

  if(error) return res.status(400).json({ status:"error", message:"Incorrect Grade"});

  next();
}

export function validateCourseInput(req,res,next){
  const {error,value} = courseSchema.validate(req.body);

  if(error) return res.status(400).json({ status:"error", message: "Invalid Input"});

  next();
}

export function validateTeacherCredentials(req,res,next){
  const {error,value} = teacherCredentialsSchema.validate(req.body);

  if(error) return res.status(400).json({status:"error", message: "Invalid Input"});

  next();
}

export function validateStudentAddCredentials(req,res,next){
  const {error,value} = studentAddCredentialsSchema.validate(req.body);

  if(error) return res.status(400).json({status:"error", message: "Invalid Input"});

  next();
}

export function validateEditStudentCredentials(req,res,next){
  const {error,value} = studentEditCredentialsSchema.validate(req.body);

  if(error) return res.status(400).json({status:"error", message: "Invalid Input"});

  next();
}

export function validateYear(req,res,next){
  const {error,value} = paramSchema.validate(req.params.year);

  if(error) return res.status(400).json({ status:"error", message: "Invalid Input"});

  next();
}

export function validateCourses(req,res,next){
  let courses = req.body.courses;
  if(!Array.isArray(courses) || courses.length===0) return res.status(401).json({ status:"error", message:"Invalid Input"});

  for(const course of courses){
    const {error,value} = idSchema.validate(course);

    if(error) return res.status(400).json({ status:"error", message:"Invalid Input"});
  };

  req.courses = courses;

  next();
}