export function isStudent(req,res,next){
  if(req.userType !== "Student") return res.status(403).json({status:"error", message: "Access denied"});
  next();
}

export function isTeacher(req,res,next){
  if(req.userType !== "Teacher") return res.status(403).json({status:"error", message : "Access denied"});
  next();
}

export function isSecretary(req,res,next){
  if(req.userType !== "Secretary") return res.status(403).json({status:"error", message : "Access denied"});
  next();
}