import prisma from "../config/prisma.js";

const isTripCompleted = (startDate, duration) => {
  const start = new Date(startDate);
  const end = new Date(start);
  end.setDate(end.getDate() + duration);
  return new Date() >= end;
};

export const addReview = async (req, res) => {
  try {
    const { tripId, rating, comment } = req.body;

  
    if (!tripId || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid review data" });
    }

    // find booking + trip
    const booking = await prisma.booking.findFirst({
      where: {
        userId: req.user.id,
        tripId,
        status: { in: ["confirmed", "completed", "pending"
        ] }
 
      },
      include: {
        trip: {
          select: {
            startDate: true,
            duration: true,
          },
        },
      },
    });

    if (!booking || !booking.trip) {
      return res.status(403).json({
        message: "You can only review trips you have booked",
      });
    }

    if (!isTripCompleted(booking.trip.startDate, booking.trip.duration)) {
      return res.status(403).json({
        message: "Trip is not completed yet. Review not allowed.",
      });
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        userId_tripId: {
          userId: req.user.id,
          tripId,
        },
      },
    });

    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this trip",
      });
    }


    const review = await prisma.review.create({
      data: {
        userId: req.user.id,
        tripId,
        rating,
        comment: comment?.trim(),
      },
    });

    res.status(201).json({
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    console.error("ADD REVIEW ERROR:", error);
    res.status(500).json({ message: "Failed to add review" });
  }
};

export const getTripReviewsForAdmin = async (req, res) => {
  try {
    const { tripId } = req.params;


    const trip = await prisma.trip.findUnique({
      where: { id: tripId },
      select: { createdById: true },
    });

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

   
    if (trip.createdById !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const reviews = await prisma.review.findMany({
      where: { tripId },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    res.status(200).json({ reviews });
  } catch (error) {
    console.error("ADMIN REVIEW ERROR:", error);
    res.status(500).json({ message: "Failed to get reviews" });
  }
};

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