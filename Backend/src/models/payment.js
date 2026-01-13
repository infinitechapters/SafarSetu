import mongoose from 'mongoose';

const paymentSchema= new mongoose.Schema({
    booking:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Booking',
        required:true,
    },
    amount:{
        type:Number,
        required:true,
    },
    paymentMethod:{
        type:String,
         enum: ["card", "upi", "netbanking"],
        required: true,
    },
    status:{
        type:String,
        enum:['pending','completed','failed'],
        default:'pending',
    },

},{timestamps:true});

export const Payment= mongoose.model("Payment", paymentSchema);