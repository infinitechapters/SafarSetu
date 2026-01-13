import mongoose from 'mongoose';

const reviewSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    trip:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Trip',
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
    },
    comment:{
        type:String,
        trim:true,
    },
},{
    timestamps:true,
});

export const Review= mongoose.model('Review', reviewSchema);