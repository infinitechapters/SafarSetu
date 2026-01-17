import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Review = () => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    alert("Review submitted ⭐");
    setRating(0);
    setComment("");
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">
        Leave a Review
      </h1>

      {/* Stars */}
      <div className="flex justify-center mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={`text-3xl ${
              star <= rating ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            ★
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your experience..."
        className="w-full border rounded p-3 text-sm"
        rows={4}
      />

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
      >
        Submit Review
      </button>
    </div>
  );
};

export default Review;
