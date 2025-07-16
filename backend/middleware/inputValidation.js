import {courseSchema, gradingSchema, loginSchema, paramSchema,userCredentialsSchema} from "../validation/validationSchemas.js";

export function validateLoginInput(req,res,next){

  const {error,value} = loginSchema.validate(req.body);
  
  if(error) return res.status(401).json({ error: "Invalid Input"});

  next();
}

export function validateParameters(req,res,next){

  for(const element in req.params){

    const {error,value} = paramSchema.validate(req.params[element]);
  
    if(error) return res.status(401).json({ error: "Invalid Input"});

  }

  next();
}

export function validateGrade(req,res,next){

  const {error,value} = gradingSchema.validate(req.body);

  if(error) return res.status(400).json({ error : "Incorrect Grade"});

  next();
}

export function validateCourseInput(req,res,next){
  const {error,value} = courseSchema.validate(req.body);

  if(error) return res.status(401).json({ error: "Invalid Input"});

  next();
}

export function validateUserCredentials(req,res,next){
  const {error,value} = userCredentialsSchema.validate(req.body);

  if(error) return res.status(401).json({ error: "Invalid Input"});

  next();
}
