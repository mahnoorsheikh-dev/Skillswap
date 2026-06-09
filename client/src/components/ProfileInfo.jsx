import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileInfo({ userId }) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    email: "",
    location: "",
  });
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId");
  const isOwner = loggedInUserId === userId;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile/${userId}`);
        if (res.data?.user) {
          setFormData({
            name: res.data.user.name || "",
            role: res.data.user.role || "",
            email: res.data.user.email || "",
            location: res.data.user.location || "",
          });
        }
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };
    if (userId) fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/profile/${userId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update profile:", err);
    }
  };

  return (
    <div className="flex flex-col items-center text-center px-6 py-6 bg-[rgb(222,233,240)]">
      <h1 className="text-4xl font-bold text-[#1D3557]">
        {formData.name || "Full Name"}
      </h1>
      <h3 className="text-gray-600 text-lg mt-1">
        {formData.role || "Your Role"}
      </h3>

      {isOwner && (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 px-6 py-2 bg-[#457B9D] hover:bg-[#1D3557] text-white rounded-lg shadow-md transition"
        >
          Edit Profile
        </button>
      )}

      <hr className="w-[80%] border-gray-300 my-8" />

      <div className="flex justify-around items-center w-full max-w-3xl text-gray-700">
        <div className="text-center">
          <p className="font-light text-[#1D3557]">Email</p>
          <p className="font-medium">{formData.email || "Not set"}</p>
        </div>
        <div className="text-center">
          <p className="font-light text-[#1D3557]">Location</p>
          <p className="font-medium">{formData.location || "Not set"}</p>
        </div>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-100">
            <h2 className="text-xl font-semibold mb-4 text-center">Edit Profile</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Full Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <input
                type="text"
                placeholder="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full p-2 border rounded"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#457B9D] text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}