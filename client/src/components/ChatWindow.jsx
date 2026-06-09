import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import ChatMessage from "./ChatMessage.jsx";
import socket from "../socket.js";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ChatWindow({ selectedContact }) {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const endRef = useRef(null);
  const chatId = selectedContact?.chatId || null;

  useEffect(() => {
    if (!chatId) return;

    const loadMessages = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/messages/${chatId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMessages(res.data);
      } catch (err) {
        console.error("Failed to load messages:", err);
      }
    };

    loadMessages();
    socket.emit("join_chat", chatId);
  }, [chatId]);

  useEffect(() => {
    const handleIncoming = (msg) => {
      if (msg.chatId === chatId) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("receive_message", handleIncoming);
    return () => socket.off("receive_message", handleIncoming);
  }, [chatId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!newMsg.trim()) return;

    try {
      const res = await axios.post(
        `${API_URL}/api/messages`,
        { chatId, sender: userId, text: newMsg },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      socket.emit("send_message", res.data);
      setMessages((prev) => [...prev, res.data]);
      setNewMsg("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  if (!selectedContact) {
    return (
      <div className="w-2/3 flex items-center justify-center text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="w-2/3 flex flex-col">
      <div className="flex items-center gap-3 border-b p-4 bg-[#fdfdfd]">
        <img
          src={selectedContact.avatar || "https://via.placeholder.com/150"}
          className="w-12 h-12 rounded-full object-cover"
          alt={selectedContact.name}
        />
        <div>
          <h2 className="font-bold text-[#1D3557]">{selectedContact.name}</h2>
          <p className="text-sm text-green-500">● Active Now</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3 bg-gray-50">
        {messages.map((msg, index) => (
          <ChatMessage
            key={index}
            text={msg.text}
            sender={msg.sender}
            avatar={selectedContact.avatar || "https://via.placeholder.com/40"}
            isOwn={msg.sender?._id === userId}
          />
        ))}
        <div ref={endRef} />
      </div>

      <div className="p-4 border-t bg-[#fafafa] flex gap-3">
        <input
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type a message..."
          className="flex-1 px-4 py-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-[#457B9D]"
        />
        <button
          onClick={sendMessage}
          className="p-3 bg-[#457B9D] text-white rounded-full hover:bg-[#1D3557] transition"
        >
          <Send />
        </button>
      </div>
    </div>
  );
}