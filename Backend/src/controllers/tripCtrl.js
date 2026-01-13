import prisma from "../config/prisma.js";

export const createTrip= async(req,res)=>{
   try{
    const {name, destination, description, price, duration, startDate, totalSeats}= req.body;
      if(!name || !destination || !price || !duration || !startDate || !totalSeats){
        return res.status(400).json({message:"All required fields must be filled"});
      }
      if(price <= 0 || duration <= 0 || totalSeats <= 0){
       return res.status(400).json({message:"Invalid numeric values"});
       }
      const trip= await prisma.trip.create({
        data:{
        name,
        destination,
        description,
        price,          
        duration,
        startDate: new Date(startDate),
        totalSeats,
        availableSeats: totalSeats,
        createdById: req.user.id,
      }});
      return res.status(201).json({
        message:"Trip created successfully", 
        trip});
   }catch(error){
       return res.status(500).json({message:"Server Error"});
   }
};

export const getAllTrips= async(req,res)=>{
   try{
    const trips= await prisma.trip.findMany({
      include: {
        createdBy: {
          select: { id:true, name: true, role: true },
        },
      },
    orderBy: {
        createdAt: "desc",
      } });
    return res.status(200).json(trips);
   }catch(error){
     return res.status(500).json({message:"Server Error"}); 
   }
}

export const singleTrip= async(req,res)=>{
    try{
      const trip=  await prisma.trip.findUnique({
        where:{id:req.params.id},
        include: {
          createdBy: {  
            select: { id:true, name: true, role: true },
          }}
      });
      if(!trip){
        return res.status(404).json({message:"Trip not found"});
      }
      return res.status(200).json(trip);
    }catch(error){
        return res.status(500).json({message:"Server Error"});
    }
}

export const updateTrip= async(req,res)=>{
    try{
      const trip= await prisma.trip.findUnique({where:{id:req.params.id}});
      if(!trip){
        return res.status(404).json({message:"Trip not found"});
      }
      if(trip.createdById.toString() !== req.user.id.toString() && req.user.role !=='admin'){
        return res.status(403).json({message:"Access Denied"});
      }
       const updatedTrip = await prisma.trip.update({
      where: { id: req.params.id },
      data: req.body,
    });
        return res.status(200).json({message:"Trip updated successfully", updatedTrip});
    }catch(error){
        return res.status(500).json({message:"Server Error"});
    }
}

export const deleteTrip= async(req,res)=>{
    try{
      const trip= await  prisma.trip.findUnique({
      where: { id: req.params.id },
    });
      if(!trip){
        return res.status(404).json({message:"Trip not found"});
      }
      if(trip.createdById.toString() !== req.user.id.toString() && req.user.role !=='admin'){
        return res.status(403).json({message:"Access Denied"});
      }
     await prisma.trip.delete({where: { id: req.params.id },});
      return res.status(200).json({message:"Trip deleted successfully"});
    }catch(error){
        return res.status(500).json({message:"Server Error"});
    }
}  