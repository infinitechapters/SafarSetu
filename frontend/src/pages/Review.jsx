import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/axios";

const Review = () => {
  const { tripId } = useParams();
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    try {
      await api.post("/review", {
        tripId,
        rating,
        comment,
      });

      alert("Review submitted ⭐");
      navigate("/bookings");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to submit review");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50 px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
       
        <div className="bg-linear-to-r from-indigo-500 to-purple-500 p-6 text-center">
          <h1 className="text-3xl font-extrabold text-white">
            Leave a Review
          </h1>
          <p className="text-indigo-100 mt-1 text-sm">
            Share your experience with others
          </p>
        </div>


        <div className="p-6 space-y-6">
         
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              How was your trip?
            </p>

            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  className={`text-4xl transition-transform duration-150 ${
                    star <= rating
                      ? "text-yellow-400 scale-110"
                      : "text-gray-300 hover:text-yellow-300"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>

            {rating > 0 && (
              <p className="mt-2 text-sm text-gray-500">
                You selected {rating} out of 5
              </p>
            )}
          </div>

        
          <div>
            <label className="block text-sm text-gray-600 mb-1">
              Your Review (optional)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="What did you like? What could be better?"
              className="w-full border rounded-xl p-3 text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
              rows={4}
            />
          </div>

          
          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
          >
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default Review;
