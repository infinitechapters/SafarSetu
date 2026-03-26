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
   
   const styles = `
.reviews-page {
  min-height: 100vh;
  background: #05101f;
  padding: 60px 5%;
  color: white;
}

.reviews-header {
  text-align: center;
  margin-bottom: 40px;
}

.review-card {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 18px;
  padding: 20px;
  transition: 0.3s;
}

.review-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 40px rgba(0,0,0,0.4);
}

.review-avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg,#1a8fda,#22d3ee);
  display:flex;
  align-items:center;
  justify-content:center;
  font-weight:bold;
}
`;

return (
<>
<style>{styles}</style>

<div className="reviews-page">
  <div className="reviews-header">
    <h1 className="text-4xl font-bold">Trip Reviews</h1>
    <p className="text-gray-400">Traveler feedback</p>
  </div>

  <div className="space-y-5 max-w-4xl mx-auto">
    {reviews.map((review) => (
      <div key={review.id} className="review-card">
        
        <div className="flex justify-between items-center">
          
          <div className="flex gap-3 items-center">
            <div className="review-avatar">
              {review.user.name?.charAt(0)}
            </div>

            <div>
              <p className="font-semibold">{review.user.name}</p>
              <p className="text-xs text-gray-400">{review.user.email}</p>
            </div>
          </div>

          <div className="flex">
            {[1,2,3,4,5].map((star)=>(
              <span key={star}
                className={star<=review.rating?"text-yellow-400":"text-gray-600"}>
                ★
              </span>
            ))}
          </div>
        </div>

        {review.comment && (
          <p className="mt-3 text-gray-300">{review.comment}</p>
        )}

        <p className="text-xs text-gray-500 mt-2">
          {new Date(review.createdAt).toLocaleString()}
        </p>
      </div>
    ))}
  </div>
</div>
</>
);

  // return (
  //   <div className="min-h-screen bg-linear-to-br from-indigo-50 to-purple-50 py-10 px-4">
  //     <div className="max-w-5xl mx-auto">

  //       <div className="text-center mb-10">
  //         <h1 className="text-4xl font-extrabold text-indigo-600">
  //           Trip Reviews
  //         </h1>
  //         <p className="text-gray-600 mt-2">
  //           Feedback from travelers who joined this trip
  //         </p>
  //       </div>

  //       <div className="space-y-6">
  //         {reviews.map((review) => (
  //           <div
  //             key={review.id}
  //             className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6"
  //           >
  //             <div className="flex items-center justify-between">
                
  //               <div className="flex items-center gap-4">
  //                 <div className="w-12 h-12 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-lg">
  //                   {review.user.name?.charAt(0).toUpperCase()}
  //                 </div>

  //                 <div>
  //                   <p className="font-semibold text-gray-800">
  //                     {review.user.name}
  //                   </p>
  //                   <p className="text-sm text-gray-500">
  //                     {review.user.email}
  //                   </p>
  //                 </div>
  //               </div>


  //               <div className="flex gap-1">
  //                 {[1, 2, 3, 4, 5].map((star) => (
  //                   <span
  //                     key={star}
  //                     className={`text-lg ${
  //                       star <= review.rating
  //                         ? "text-yellow-400"
  //                         : "text-gray-300"
  //                     }`}
  //                   >
  //                     ★
  //                   </span>
  //                 ))}
  //               </div>
  //             </div>

  //             {review.comment && (
  //               <p className="mt-4 text-gray-700 leading-relaxed">
  //                 {review.comment}
  //               </p>
  //             )}

  //             <p className="text-xs text-gray-400 mt-3">
  //               {new Date(review.createdAt).toLocaleString()}
  //             </p>
  //           </div>
  //         ))}
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default AdminTripReviews;
