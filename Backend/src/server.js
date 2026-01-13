import express from "express";
import dotenv from "dotenv";
import cors from "cors";

//routes imports
import userRoutes from "./routes/userRoutes.js";
import tripRoutes from "./routes/tripRoutes.js";
import bookingRoute from "./routes/bookingRoute.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";  

dotenv.config();

const app= express();

app.use(cors({
    origin:"http://localhost:5173",
    credential:true,
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.send("Backend is running");
})

const PORT = process.env.PORT || 5000;

//Routes
app.use("/api/users",userRoutes);
app.use('/api/trips',tripRoutes);
app.use('/api/bookings',bookingRoute);
app.use('/api/reviews',reviewRoutes);
app.use('/api/payments',paymentRoutes);

app.use((req, res) => {
  res.status(404).json({ message: "Route not found"  || "Server Error"});
});

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`);
})
