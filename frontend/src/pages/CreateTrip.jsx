import { useState } from "react";
import { createTrip } from "../lib/tripApi";
import { useNavigate } from "react-router-dom";

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

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createTrip({
        ...formData,
        price: Number(formData.price),
        duration: Number(formData.duration),
        totalSeats: Number(formData.totalSeats),
      });

      alert("Trip created successfully 🎉");
      navigate("/trips");
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create trip");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-6">
        Create Trip
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          placeholder="Trip Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="destination"
          placeholder="Destination"
          value={formData.destination}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <textarea
          name="description"
          placeholder="Trip Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          rows={3}
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Price (₹)"
            value={formData.price}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="duration"
            placeholder="Duration (days)"
            value={formData.duration}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />

          <input
            type="number"
            name="totalSeats"
            placeholder="Total Seats"
            value={formData.totalSeats}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 transition"
        >
          {loading ? "Creating..." : "Create Trip"}
        </button>
      </form>
    </div>
  );
};

export default CreateTrip;
