import prisma from "../config/prisma.js";

export const createBooking= async(req,res)=>{
    try{
       const {tripId, seatsBooked}= req.body;
       if(!tripId || !seatsBooked || seatsBooked <=0){
        return res.status(400).json({message:"Invalid booking data"});
       }
       const booking= await prisma.$transaction(async(t)=>{
        const trip= await t.trip.findUnique({
            where:{id:tripId},
        });
        if(!trip || trip.availableSeats < seatsBooked){
            throw new Error("Not enought seats");
        }
          await t.trip.update({
            where:{id:tripId},
            data:{
                availableSeats:{
                    decrement: seatsBooked,
                },
            },
          });
              const booking =await prisma.booking.create({
        data:{
        userId:req.user.id,
        tripId,
        seatsBooked,    
        totalAmount: trip.price* seatsBooked,
        status:'pending',
    },
    });    return booking;  
       });
     return res.status(201).json({
      message: "Booking created successfully",
      booking,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Booking failed" });
  }
} 

export const cancelBooking= async(req,res)=>{
try{
 const {bookingId}= req.params;
     await prisma.$transaction( async(t)=>{
        const booking= await t.booking.findUnique({
            where:{
                id:bookingId,
            }
        });
        if(!booking){
        throw new Error("Booking not found");
      }
      if( booking.userId !== req.user.id && req.user.role !== 'admin'){
        throw new Error("Access Denied");
      }
      if(booking.status ==='cancelled'){
        throw new Error("Booking already cancelled");
      }

      await t.trip.update({
        where:{id:booking.tripId},
        data:{
            availableSeats:{
                increment: booking.seatsBooked,
            },
        },
      })
       await t.booking.update({
        where:{id:bookingId},
        data:{
            status:'cancelled',
        },
       });
     });
     return res.status(200).json({message:"Booking cancelled successfully"});
    }
    catch(error){
        return res.status(500).json({message:"Failed to cancel booking"});
    }
}

export const getMyBookings=async(req,res)=>{
    try{
      const bookings =await prisma.booking.findMany({
        where:{userId:req.user.id},
        include:{
            trip:{
                select:{
                    name:true, destination:true, price:true, startDate:true,
                }
            }
        },
        orderBy:{createdAt:"desc"},
      });
      return res.status(200).json({bookings});
    }catch(error){
        return res.status(500).json({
            message:"Failed to fetch bookings"
        })
    }
}

export const getBookingsForAdmin = async (req, res) => {
  try {
    const bookings = await prisma.booking.findMany({
      where: {
        trip: {
          createdById: req.user.id, // admin's trips
        },
      },
     include: {
        trip: {
          select: {
            name: true,
            destination: true,
            startDate: true,
          },
        },
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admin bookings" });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const allowedStatuses = ["CONFIRMED", "REJECTED", "COMPLETED"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { trip: true },
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.trip.createdById !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: bookingId },
      data: { status: status.toLowerCase() },
    });

    res.status(200).json({
      message: "Booking status updated",
      booking: updatedBooking,
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update booking status" });
  }
};
