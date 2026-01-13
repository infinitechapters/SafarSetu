import prisma from "../config/prisma.js";

export const addReview= async (req,res)=>{
    try{
      const {tripId,rating,comment}= req.body;
      if(!tripId || !rating || rating<1 || rating>5){
        return res.status(400).json({message:"Invalid review data"});
      }
      const booking= await prisma.booking.findFirst({
        where:{
        userId: req.user.id,
        tripId,
        status: 'confirmed'
      }});
      if(!booking){
        return res.status(403).json({message:"You can only review trips you have booked"});
      }
      const existingReview= await prisma.review.findUnique({
        where:{
          userId_tripId:{
        userId: req.user.id,
        tripId,
      }}});
      if(existingReview){
        return res.status(400).json({message:"You have already reviewed this trip"});
      } 
     
      const review= await prisma.review.create({
        data:{
        userId:req.user.id,
        tripId,
        rating,
        comment:comment?.trim(),
      }})
        return res.status(201).json({
        message:"Review added successfully",
        review,
        })
    }catch(error){
       res.status(500).json({message:"Failed to add review"});
    }
}

export const getReviews = async(req,res)=>{
  try{
    const {tripId}= req.params;
    const reviews= await prisma.review.findMany({
      where:{tripId},
      include:{
        user:{
          select:{
            name:true,
          }
        }
      },
      orderBy:{createdAt:"desc"},
  })
    res.status(200).json({
      reviews,
    });
  }catch(error){
    res.status(500).json({message:"Failed to get reviews"});
  }
}