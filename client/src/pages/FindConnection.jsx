import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function FindConnection() {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const loggedInUserId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile?search=${search}`);
        setUsers(res.data.users || []);
      } catch (err) {
        console.error("Error fetching profiles:", err);
      }
    };
    fetchUsers();
  }, [search]);

  const handleConnect = async (otherUserId) => {
    if (loggedInUserId === otherUserId) {
      alert("You cannot connect with yourself!");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${API_URL}/api/chats`,
        { user1: loggedInUserId, user2: otherUserId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate("/chats");
    } catch (err) {
      console.error("Chat creation error:", err);
      alert("Failed to create chat!");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#1D3557] mb-6">
          Find Connection
        </h1>

        <div className="flex justify-center mb-8">
          <input
            type="text"
            placeholder="Search by skills (e.g. React, UI/UX, Python)"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border rounded-xl shadow-sm focus:ring-2 focus:ring-[#457B9D] outline-none transition"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {users.length > 0 ? (
            users.map((user) => (
              <div
                key={user._id}
                className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center hover:shadow-xl transition"
              >
                <img
                  src={user.avatar || "https://ui-avatars.com/api/?size=150&name=User"}
                  alt={user.name}
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                />
                <h2 className="text-xl font-semibold text-[#1D3557]">{user.name}</h2>
                {user.skillsOffered?.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Offers: {user.skillsOffered.join(", ")}
                  </p>
                )}
                {user.skillsWanted?.length > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    Wants: {user.skillsWanted.join(", ")}
                  </p>
                )}
                <button
                  onClick={() => handleConnect(user.userId.toString())}
                  className="mt-4 bg-[#457B9D] text-white px-5 py-2 rounded-xl hover:bg-[#1D3557] transition"
                >
                  Connect
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No connections found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}