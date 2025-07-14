export function isStudent(req,res,next){
  if(req.userType !== "student") return res.status(403).json({ error : "Access denied"});
  next();
}

export function isTeacher(req,res,next){
  if(req.userType !== "teacher") return res.status(403).json({ error : "Access denied"});
  next();
}

export function isSecretary(req,res,next){
  if(req.userType !== "secretary") return res.status(403).json({ error : "Access denied"});
  next();
}