import { useEffect, useState, useRef } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileHeader({ userId }) {
  const [avatar, setAvatar] = useState("");
  const fileInputRef = useRef(null);
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId");
  const isOwner = loggedInUserId === userId;

  useEffect(() => {
    const fetchAvatar = async () => {
      if (!userId) return;
      try {
        const res = await axios.get(`${API_URL}/api/profile/${userId}`);
        if (res.data?.user?.avatar) {
          setAvatar(res.data.user.avatar);
        }
      } catch (err) {
        console.error("Error fetching avatar:", err);
      }
    };
    fetchAvatar();
  }, [userId]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await axios.put(`${API_URL}/api/profile/${userId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data?.user?.avatar) {
        setAvatar(res.data.user.avatar);
      }
    } catch (err) {
      console.error("Error uploading avatar:", err);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[rgb(222,233,240)] relative py-6">
      <img
        src={avatar || "https://via.placeholder.com/150"}
        alt="User Avatar"
        className={`w-40 h-40 rounded-full border-4 border-white shadow-md object-cover ${isOwner ? "cursor-pointer hover:opacity-80 transition" : ""}`}
        onClick={() => isOwner && fileInputRef.current.click()}
      />
      {isOwner && (
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      )}
    </div>
  );
}