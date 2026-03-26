// import { useState } from "react";
// import { createTrip } from "../lib/tripApi";
// import { useNavigate } from "react-router-dom";

// const CreateTrip = () => {
//   const navigate = useNavigate();

//   const [formData, setFormData] = useState({
//     name: "",
//     destination: "",
//     description: "",
//     price: "",
//     duration: "",
//     startDate: "",
//     totalSeats: "",
//   });

//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       await createTrip({
//         ...formData,
//         price: Number(formData.price),
//         duration: Number(formData.duration),
//         totalSeats: Number(formData.totalSeats),
//       });

//       alert("Trip created successfully 🎉");
//       navigate("/trips");
//     } catch (error) {
//       alert(error.response?.data?.message || "Failed to create trip");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
//       <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
//         Create Trip
//       </h1>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <input
//           name="name"
//           placeholder="Trip Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <input
//           name="destination"
//           placeholder="Destination"
//           value={formData.destination}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           required
//         />

//         <textarea
//           name="description"
//           placeholder="Trip Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border p-2 rounded"
//           rows={3}
//         />

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="number"
//             name="price"
//             placeholder="Price (₹)"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             type="number"
//             name="duration"
//             placeholder="Duration (days)"
//             value={formData.duration}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <input
//             type="date"
//             name="startDate"
//             value={formData.startDate}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />

//           <input
//             type="number"
//             name="totalSeats"
//             placeholder="Total Seats"
//             value={formData.totalSeats}
//             onChange={handleChange}
//             className="w-full border p-2 rounded"
//             required
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
//         >
//           {loading ? "Creating..." : "Create Trip"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateTrip;


import { useState } from "react";
import { createTrip } from "../lib/tripApi";
import { useNavigate } from "react-router-dom";
import { uploadImage } from "../lib/cloudinary";
import { api } from "../lib/axios";


const CreateTrip = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    destination: "",
    description: "",
    price: "",
    duration: "",
    startDate: "",
    totalSeats: "",
  });

  const [image, setImage] = useState(null); 
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = "";

    if (image) { // ⭐ correct variable
      imageUrl = await uploadImage(image);
    }

    await createTrip({
      ...formData,
      price: Number(formData.price),
      duration: Number(formData.duration),
      totalSeats: Number(formData.totalSeats),
      image: imageUrl, 
    });

    alert("Trip created successfully 🎉");
    navigate("/trips");
  } catch (error) {
    alert(error.response?.data?.message || "Failed to create trip");
  } finally {
    setLoading(false);
  }
};

const styles = `
.create-page {
  min-height: 100vh;
  background: #05101f;
  padding: 60px 5%;
  display: flex;
  justify-content: center;
}

.create-card {
  width: 100%;
  max-width: 800px;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 22px;
  overflow: hidden;
  backdrop-filter: blur(12px);
}

.create-header {
  padding: 30px;
  text-align: center;
  background: linear-gradient(135deg,#1a8fda,#22d3ee);
}

.create-header h1 {
  font-size: 30px;
  font-weight: 800;
  color: white;
}

.create-header p {
  color: rgba(255,255,255,0.8);
  font-size: 13px;
}

.input {
  width: 100%;
  padding: 10px 12px;
  border-radius: 10px;
  border: 1px solid rgba(255,255,255,0.1);
  background: transparent;
  color: white;
}

.input::placeholder {
  color: rgba(255,255,255,0.4);
}

.label {
  font-size: 12px;
  color: rgba(255,255,255,0.6);
}

.upload-btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid rgba(34,211,238,0.4);
  color: #22d3ee;
  cursor: pointer;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  border-radius: 14px;
  background: linear-gradient(135deg,#1a8fda,#22d3ee);
  color: white;
  font-weight: 600;
  transition: 0.3s;
}

.submit-btn:hover {
  transform: translateY(-2px);
}
`;

return (
<>
<style>{styles}</style>

<div className="create-page">
  <div className="create-card">

    <div className="create-header">
      <h1>Create New Trip</h1>
      <p>Add a new travel experience</p>
    </div>

    <form onSubmit={handleSubmit} className="p-6 space-y-6">

      {/* IMAGE */}
      <div>
        <label className="label mb-2 block">Trip Image</label>
        <div className="flex items-center gap-4">
          <label className="upload-btn">
            Upload
            <input type="file" hidden onChange={handleImageChange}/>
          </label>

          {preview && (
            <img
              src={preview}
              className="w-20 h-20 object-cover rounded-lg border"
            />
          )}
        </div>
      </div>

      {/* NAME + DEST */}
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="label">Trip Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input mt-1"
            placeholder="Goa Escape"
          />
        </div>

        <div>
          <label className="label">Destination</label>
          <input
            name="destination"
            value={formData.destination}
            onChange={handleChange}
            className="input mt-1"
            placeholder="Goa"
          />
        </div>
      </div>

      {/* DESC */}
      <div>
        <label className="label">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="input mt-1"
          rows={4}
        />
      </div>

      {/* PRICE / DURATION / SEATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="label">Price</label>
          <input type="number" name="price"
            value={formData.price}
            onChange={handleChange}
            className="input mt-1"/>
        </div>

        <div>
          <label className="label">Duration</label>
          <input type="number" name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="input mt-1"/>
        </div>

        <div>
          <label className="label">Seats</label>
          <input type="number" name="totalSeats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="input mt-1"/>
        </div>
      </div>

      {/* DATE */}
      <div>
        <label className="label">Start Date</label>
        <input type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          className="input mt-1"/>
      </div>

      {/* SUBMIT */}
      <button
        disabled={loading}
        className="submit-btn">
        {loading ? "Creating..." : "Create Trip"}
      </button>

    </form>
  </div>
</div>
</>
);


  // return (
  //   <div className="max-w-3xl mx-auto px-4 py-10">
  //     <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

  //       <div className="bg-linear-to-r from-indigo-500 to-purple-500 p-6">
  //         <h1 className="text-3xl font-extrabold text-white text-center">
  //           Create New Trip
  //         </h1>
  //         <p className="text-indigo-100 text-center mt-1">
  //           Add a new travel experience for users
  //         </p>
  //       </div>

  //       <form onSubmit={handleSubmit} className="p-6 space-y-6">
  //         {/* IMAGE UPLOAD (OPTIONAL) */}
  //         <div>
  //           <label className="block text-sm font-medium text-gray-700 mb-2">
  //             Trip Image (optional)
  //           </label>

  //           <div className="flex items-center gap-4">
  //             <label className="cursor-pointer px-4 py-2 border rounded-lg text-sm text-indigo-600 hover:bg-indigo-50 transition">
  //               Upload Image
  //               <input
  //                 type="file"
  //                 accept="image/*"
  //                 onChange={handleImageChange}
  //                 className="hidden"
  //               />
  //             </label>

  //             {preview && (
  //               <img
  //                 src={preview}
  //                 alt="Preview"
  //                 className="w-20 h-20 rounded-lg object-cover border"
  //               />
  //             )}
  //           </div>
  //         </div>

  //         {/* BASIC INFO */}
  //         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //           <div>
  //             <label className="text-sm text-gray-600">Trip Name</label>
  //             <input
  //               name="name"
  //               value={formData.name}
  //               onChange={handleChange}
  //               placeholder="e.g. Goa Beach Escape"
  //               className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
  //               required
  //             />
  //           </div>

  //           <div>
  //             <label className="text-sm text-gray-600">Destination</label>
  //             <input
  //               name="destination"
  //               value={formData.destination}
  //               onChange={handleChange}
  //               placeholder="e.g. Goa, India"
  //               className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
  //               required
  //             />
  //           </div>
  //         </div>

  //         <div>
  //           <label className="text-sm text-gray-600">
  //             Trip Description
  //           </label>
  //           <textarea
  //             name="description"
  //             value={formData.description}
  //             onChange={handleChange}
  //             placeholder="Describe the trip experience..."
  //             rows={4}
  //             className="w-full mt-1 border rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 outline-none"
  //           />
  //         </div>

  //         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  //           <div>
  //             <label className="text-sm text-gray-600">Price (₹)</label>
  //             <input
  //               type="number"
  //               name="price"
  //               value={formData.price}
  //               onChange={handleChange}
  //               className="w-full mt-1 border rounded-lg px-3 py-2"
  //               required
  //             />
  //           </div>

  //           <div>
  //             <label className="text-sm text-gray-600">
  //               Duration (days)
  //             </label>
  //             <input
  //               type="number"
  //               name="duration"
  //               value={formData.duration}
  //               onChange={handleChange}
  //               className="w-full mt-1 border rounded-lg px-3 py-2"
  //               required
  //             />
  //           </div>

  //           <div>
  //             <label className="text-sm text-gray-600">
  //               Total Seats
  //             </label>
  //             <input
  //               type="number"
  //               name="totalSeats"
  //               value={formData.totalSeats}
  //               onChange={handleChange}
  //               className="w-full mt-1 border rounded-lg px-3 py-2"
  //               required
  //             />
  //           </div>
  //         </div>

  //         <div>
  //           <label className="text-sm text-gray-600">
  //             Start Date
  //           </label>
  //           <input
  //             type="date"
  //             name="startDate"
  //             value={formData.startDate}
  //             onChange={handleChange}
  //             className="w-full mt-1 border rounded-lg px-3 py-2"
  //             required
  //           />
  //         </div>

  //         <button
  //           type="submit"
  //           disabled={loading}
  //           className="w-full bg-indigo-600 text-white py-3 rounded-xl font-semibold hover:bg-indigo-700 disabled:bg-gray-400 transition"
  //         >
  //           {loading ? "Creating Trip..." : "Create Trip"}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );
};

export default CreateTrip;
