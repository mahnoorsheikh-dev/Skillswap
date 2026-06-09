import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import ChatSidebar from "../components/ChatSidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function Chats() {
  const location = useLocation();
  const [selectedContact, setSelectedContact] = useState(null);
  const [chats, setChats] = useState([]);
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  const loadChats = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/chats/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChats(res.data);
    } catch (err) {
      console.error("Failed to load chats:", err);
    }
  }, [userId, token]);

  useEffect(() => {
    loadChats();
  }, [loadChats]);

  useEffect(() => {
    if (location.state?.selectedContact) {
      setSelectedContact(location.state.selectedContact);
    }
  }, [location.state]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden flex h-[85vh] border">
        <ChatSidebar
          chats={chats}
          selectContact={setSelectedContact}
          userId={userId}
        />
        <ChatWindow
          selectedContact={selectedContact}
          reloadChats={loadChats}
        />
      </div>
    </div>
  );
}