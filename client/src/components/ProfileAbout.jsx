import { useState, useEffect } from "react";
import { Save, Edit3 } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileAbout({ userId }) {
  const [about, setAbout] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId");
  const isOwner = loggedInUserId === userId;

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile/${userId}`);
        if (res.data?.user?.about) {
          setAbout(res.data.user.about);
          setIsSaved(true);
        }
      } catch (err) {
        console.error("Error fetching about:", err);
      }
    };
    if (userId) fetchAbout();
  }, [userId]);

  const handleSave = async () => {
    if (!about.trim()) return;
    try {
      await axios.put(
        `${API_URL}/api/profile/${userId}`,
        { about },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsSaved(true);
    } catch (err) {
      console.error("Error saving about:", err);
    }
  };

  return (
    <div className="px-8 py-6 border-t border-gray-200">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-gray-800">About</h2>
        {isOwner && (
          isSaved ? (
            <button onClick={() => setIsSaved(false)} className="p-2">
              <Edit3 className="w-4 h-4 text-[#1D3557]" />
            </button>
          ) : (
            <button onClick={handleSave} className="p-2">
              <Save className="w-4 h-4 text-[#1D3557]" />
            </button>
          )
        )}
      </div>

      {isOwner && !isSaved ? (
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell the world who you are, your journey, and your passion!"
          className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          rows="4"
        />
      ) : (
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {about || "No about info added yet."}
        </p>
      )}
    </div>
  );
}