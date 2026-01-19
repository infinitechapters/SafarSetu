import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  const features = [
    {
      title: "Easy Booking",
      desc: "Book trips in just a few clicks",
      icon: "🧾",
      gradient: "from-indigo-500 to-purple-500",
    },
    {
      title: "Secure Payments",
      desc: "Fast & safe payment experience",
      icon: "💳",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      title: "Trusted Reviews",
      desc: "Real feedback from real travelers",
      icon: "⭐",
      gradient: "from-yellow-400 to-orange-500",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 px-6 py-16">

      <div className="text-center max-w-3xl mx-auto mb-14">
        <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
          Why Choose <span className="text-indigo-600">Us?</span>
        </h1>
        <p className="text-gray-600 text-lg">
          Everything you need for a smooth, secure and memorable travel experience.
        </p>
      </div>

    
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="group relative bg-white/70 backdrop-blur-lg p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
          >
            
            <div
              className={`w-16 h-16 flex items-center justify-center text-3xl rounded-xl bg-linear-to-r ${f.gradient} text-white mb-6`}
            >
              {f.icon}
            </div>

           
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {f.title}
            </h3>
            <p className="text-gray-600">{f.desc}</p>

           
            <div className="absolute inset-0 rounded-2xl bg-indigo-500 opacity-0 group-hover:opacity-5 transition"></div>
          </div>
        ))}
      </div>

   
      <div className="text-center mt-16">
        <button onClick={() => navigate("/trips")} className="px-8 py-4 bg-indigo-600 text-white text-lg rounded-full font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition-all">
          Start Exploring Trips ✈️
        </button>
      </div>
    </div>
  );
};

export default Home;
