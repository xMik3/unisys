import type {NextFunction, Request, Response} from "express";

export function isStudent(req : Request,res : Response,next : NextFunction){
  if(req.userType !== "Student") return res.status(403).json({status:"error", message: "Access denied"});
  next();
}

export function isTeacher(req : Request,res : Response,next : NextFunction){
  if(req.userType !== "Teacher") return res.status(403).json({status:"error", message : "Access denied"});
  next();
}

export function isSecretary(req : Request,res : Response,next : NextFunction){
  if(req.userType !== "Secretary") return res.status(403).json({status:"error", message : "Access denied"});
  next();
}
