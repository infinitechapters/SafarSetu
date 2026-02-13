import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../lib/authstore";
import { uploadImage } from "../lib/cloudinary";
import { api } from "../lib/axios";


const Profile = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error("Failed to load profile", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleProfilePic = async (file) => {
    if (!file) return;

    try {
      const imageUrl = await uploadImage(file);

      await api.put("/users/profile", {
        profileImage: imageUrl,
      });

      // update UI
      setUser((prev) => ({ ...prev, profileImage: imageUrl }));
    } catch (err) {
      console.log(err);
      alert("Image upload failed");
    }
  };


  const handleUpdate = async () => {
    try {
      const updated = await updateProfile(formData);
      setUser(updated);
      setEditing(false);
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading profile...</p>;
  if (!user) return <p className="text-center mt-10">Profile not found</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-md p-6">

        {/* Header */}
        <div className="flex items-center gap-6 border-b pb-6">
          <div className="relative">
            <img
              src={user.profileImage || "https://i.pravatar.cc/150"}
              className="h-24 w-24 rounded-full object-cover border"
            />

            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleProfilePic(e.target.files[0])}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
          </div>

          <div>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400">
              Joined {new Date(user.createdAt).toDateString()}
            </p>
          </div>
        </div>

        {/* Details */}
        <Section title="Personal Details">
          <InputField label="Name" name="name" value={formData.name} editing={editing} onChange={handleChange} />
          <InputField label="Phone" name="phone" value={formData.phone} editing={editing} onChange={handleChange} />
          <InputField label="Gender" name="gender" value={formData.gender} editing={editing} onChange={handleChange} />
          <InputField label="Nationality" name="nationality" value={formData.nationality} editing={editing} onChange={handleChange} />
          <InputField label="Address" name="address" value={formData.address} editing={editing} onChange={handleChange} />
          <Field label="Role" value={user.role} />
        </Section>

        {/* Actions */}
        <div className="flex justify-end mt-6 gap-4">
          {!editing ? (
            <button
              onClick={() => setEditing(true)}
              className="px-4 py-2 border rounded-lg hover:bg-gray-100"
            >
              Edit Profile
            </button>
          ) : (
            <button
              onClick={handleUpdate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Save Changes
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-4">{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">{children}</div>
  </div>
);

const Field = ({ label, value }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    <p className="font-medium">{value || "—"}</p>
  </div>
);

const InputField = ({ label, name, value, editing, onChange }) => (
  <div className="bg-gray-50 p-4 rounded-lg">
    <p className="text-sm text-gray-500">{label}</p>
    {editing ? (
      <input
        name={name}
        value={value || ""}
        onChange={onChange}
        className="w-full border rounded px-2 py-1 mt-1"
      />
    ) : (
      <p className="font-medium">{value || "—"}</p>
    )}
  </div>
);

export default Profile;
