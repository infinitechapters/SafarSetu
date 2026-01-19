import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTripReviewsForAdmin } from "../lib/reviewApi";

const AdminTripReviews = () => {
  const { tripId } = useParams();

  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getTripReviewsForAdmin(tripId);
        setReviews(res.data.reviews);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [tripId]);

  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
        <p className="text-gray-500 animate-pulse text-lg">
          Loading reviews...
        </p>
      </div>
    );
  }


  if (reviews.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-indigo-50 to-purple-50">
        <p className="text-gray-500 text-lg">
          No reviews for this trip yet ⭐
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">

        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-indigo-600">
            Trip Reviews
          </h1>
          <p className="text-gray-600 mt-2">
            Feedback from travelers who joined this trip
          </p>
        </div>

        <div className="space-y-6">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
            >
              <div className="flex items-center justify-between">
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
                    {review.user.name?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.user.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {review.user.email}
                    </p>
                  </div>
                </div>


                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      className={`text-lg ${
                        star <= review.rating
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {review.comment && (
                <p className="mt-4 text-gray-700 leading-relaxed">
                  {review.comment}
                </p>
              )}

              <p className="text-xs text-gray-400 mt-3">
                {new Date(review.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminTripReviews;
