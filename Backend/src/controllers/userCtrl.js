import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";
 
//Get profile
// export const getMe = async (req, res) => {
//   res.json({
//       id: req.user.id,
//       name: req.user.name,
//       email: req.user.email,
//       role: req.user.role?.toUpperCase() ,
//   });
// };
export const getMe = async (req, res) => {
  try {
     if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        dob: true,
        address: true,
        nationality: true,
        role: true,
        profileImage: true,
        createdAt: true,
      },
    });
     if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.log("GETME ERROR:", err); 
    return res.status(500).json({ message: "Failed to fetch profile" });
  }
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

//Login 
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
            secure:true,
            sameSite: "none",
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

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, phone, gender, dob, address, nationality } = req.body;

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        phone,
        gender,
        dob: dob ? new Date(dob) : null,
        address,
        nationality,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        gender: true,
        dob: true,
        address: true,
        nationality: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: "Profile update failed" });
  }
};

export const profileImageUpdate = async (req, res) => {
  const { profileImage } = req.body;

  const user = await prisma.user.update({
    where: { id: req.user.id },
    data: { profileImage },
  });

  res.json(user);
};


export const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.json({ message: "Logged out successfully" });
};
