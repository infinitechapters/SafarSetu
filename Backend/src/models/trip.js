import mongoose from 'mongoose';

const tripSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim: true,
    },
    destination:{
        type:String,
        required:true,
        trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    price:{
            type:Number,
            required:true,
            min:0,
    },
    duration:{
            type:Number,
            required:true,
            min:1,
    },
    startDate:{
            type:Date,
            required:true,
    },
    totalSeats:{
            type:Number,
            required:true,
            min:1,
    },
    availableSeats:{
            type:Number,
            required:true,
            min:0,  
    },
    createdBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
    },
    status: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    },
{timestamps: true,}
)
 export const Trip= mongoose.model('Trip', tripSchema);