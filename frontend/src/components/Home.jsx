import React from 'react'

const Home = () => {
  const features = [
    { title: "Easy Booking", icon: "🧾" },
    { title: "Secure Payments", icon: "💳" },
    { title: "Trusted Reviews", icon: "⭐" },
  ];

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Why Choose Us?
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-6 shadow-lg rounded text-center"
          >
            <div className="text-5xl mb-4">{f.icon}</div>
            <h3 className="text-xl font-semibold">{f.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home