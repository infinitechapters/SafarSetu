import jwt from 'jsonwebtoken';
import prisma from "../config/prisma.js";

export const auth= async(req,res,next)=>{
try{
    const token = req.cookies?.token;
    if(!token){
        return res.status(401).json({
            message:"Not authorized"
        })
    }
    const decode= jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user= await prisma.user.findUnique({where:{id:decode.id}});

    if(!req.user){
        return res.status(401).json({
            message:"Not authorized"
        })
    }
    next();
    
}catch(error){
    return res.status(401).json({
        message:"Not authorized"});
}
}

export const roleAuthorize = (...roles) => {
  return (req, res, next) => {
    const userRole = req.user.role?.toUpperCase();

    // console.log("User role:", userRole);
    // console.log("Allowed roles:", roles);

    if (!roles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden: You don't have permission",
      });
    }

    next();
  };
};


