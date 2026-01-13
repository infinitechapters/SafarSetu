import prisma from "../config/prisma.js";

export const createPayment = async (req, res) => {
   try{
    const { bookingId, method } = req.body;
    if(!bookingId || !method){
        return res.status(400).json({message:"All required fields must be filled"});
    }
    const payment= await prisma.$transaction(async(t)=>{
        const bookingRecord= await t.booking.findUnique({
            where:{id:bookingId},
            include: { payment: true },
        });
        if(!bookingRecord){
            throw new Error("Booking not found");
        }
        if(bookingRecord.userId !== req.user.id){
            throw new Error("Access Denied");
        }
         if (bookingRecord.payment) throw new Error("Payment already completed");

        const payment= await t.payment.create({
            data:{
                bookingId,
                amount: bookingRecord.totalAmount,
                method,
                status:'completed',
            },
        });
        await t.booking.update({
            where:{id:bookingId},
            data:{
                status:'confirmed',
            }
        });
        return payment;
    });
    res.status(201).json({
        message:"Payment processed successfully",
        payment,
    });
   }catch(error){
    res.status(500).json({message:error.message || "Payment processing failed"});
   }
}