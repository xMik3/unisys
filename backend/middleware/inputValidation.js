import {userSchema,parameterSchema} from "../validation/validationSchema.js";

export function validateLoginInputs(req,res,next){
  
  const {error,value} = userSchema.validate(req.body);
  
  if(error) return res.status(401).json({ error: "Invalid Inputs"});

  next();
}

export function validateParameters(req,res,next){

  if(req.params.courseID){
    const {error,value} = parameterSchema.validate(req.params.courseID);
  
    if(error) return res.status(401).json({ error: "Invalid Inputs"});
  }

  if(req.params.studentID){
    const {error,value} = parameterSchema.validate(req.params.studentID);
    
    if(error) return res.status(401).json({ error: "Invalid Inputs"});
  }

  if(req.params.teacherID){
    const {error,value} = parameterSchema.validate(req.params.teacherID);
    
    if(error) return res.status(401).json({ error: "Invalid Inputs"});
  }

  next();
}

