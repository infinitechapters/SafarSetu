import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
 
export const getMe = async (req, res) => {
  res.json({
      id: req.user.id,
      name: req.user.name,
      email: req.user.email,
      role: req.user.role?.toUpperCase() ,
  });
};

export const register= async(req,res)=>{
    try{
    const {name, email, password, role}= req.body;

     if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
    const newUser= await prisma.user.findUnique({where:{email}});
    if(newUser){
        return res.status(400).json({
            message:"User already exists"
        });
    }
    const hashPassword= await bcrypt.hash(password,10);
    const user= await prisma.user.create({
        data:{
        name,
        email,
        password:hashPassword,
        role: role?.toUpperCase()  || 'USER',
    },
    });

    return res.status(201).json({
        message:"User registered successfully",
        user:{
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            message:"Registration failed"
        });
    }
};

export const login = async(req,res)=>{
    try{
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"All fields are required"
        });
    }
    let user= await prisma.user.findUnique({where:{email}});
    if(!user){
        return res.status(400).json({
            message:"User does not exist"
        });
    }
     const isCorrect= await bcrypt.compare(password, user.password);
     if(!isCorrect){
        return res.status(400).json({
            message:"Invalid credentials"
        });
     }
     const token= generateToken(user.id);
        res.cookie("token", token, {  
            httpOnly: true,
            secure:false,
            sameSite: "lax",
            maxAge: 5 * 24 * 60 * 60 * 1000, 
        });

     return res.json({
        message:"Login successful",
        user:{
            id:user.id,
            name:user.name,
            email:user.email,
            role:user.role,
        }
     });
    }catch(error){
        return res.status(500).json({
            message:"Login failed"
        });
    }
}

export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
  });

  res.json({ message: "Logged out successfully" });
};
