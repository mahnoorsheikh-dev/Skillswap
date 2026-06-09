import { useState } from "react";
import { Link } from "react-router-dom";
import { User, Search, MessageCircle } from "lucide-react";

export default function DashboardHome() {
  const [userName] = useState(() => localStorage.getItem("userName") || "there");
  const [userId] = useState(() => localStorage.getItem("userId"));

  return (
    <div className="min-h-screen bg-[#F6F9FE] px-6 py-10">
      <div className="p-16 rounded-2xl text-white bg-linear-to-r from-[#1D3557] to-[#457B9D]">
        <h1 className="text-4xl font-bold">Hi, {userName}!</h1>
        <p className="text-white/90 mt-3 text-lg">
          You have become a member of <span className="font-semibold">SkillSwap</span>!
          We hope you gain valuable experience and make meaningful connections.
        </p>
        <p className="text-white/80 mt-2 italic">
          "The beautiful thing about learning is that no one can take it away from you." – B.B. King
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <Search className="text-[#1D3557]" />
            <h2 className="text-xl font-semibold text-[#1D3557]">Find Connections</h2>
          </div>
          <p className="text-gray-600">Discover people who match your skills and interests.</p>
          <Link to="/findconnection" className="mt-4 inline-block text-[#1D3557] font-semibold hover:underline">
            Explore →
          </Link>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <MessageCircle className="text-[#1D3557]" />
            <h2 className="text-xl font-semibold text-[#1D3557]">Your Chats</h2>
          </div>
          <p className="text-gray-600">Continue conversations with people you have connected with.</p>
          <Link to="/chats" className="mt-4 inline-block text-[#1D3557] font-semibold hover:underline">
            Open Chats →
          </Link>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mt-6">
        <div className="flex items-center gap-3 mb-3">
          <User className="text-[#1D3557]" />
          <h2 className="text-xl font-semibold text-[#1D3557]">Your Profile</h2>
        </div>
        <p className="text-gray-600">Keep your profile updated so others can discover you easily.</p>
        <div className="flex gap-4 mt-4">
          <Link
            to={userId ? `/profile/${userId}` : "#"}
            className="px-5 py-2 bg-[#1D3557] text-white rounded-lg"
          >
            View Profile
          </Link>
        </div>
      </div>
    </div>
  );
}