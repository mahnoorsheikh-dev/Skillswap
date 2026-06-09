import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setIsOpen(false);
    window.dispatchEvent(new Event("storage"));
    navigate("/auth");
  };

  return (
    <nav className="bg-[#1D3557] text-white px-6 py-4 flex justify-between items-center shadow-md">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        SkillSwap
      </h1>

      <div className="flex items-center gap-10">
        <Link to="/dashboard" className="hover:text-[#A8DADC]">Home</Link>
        <Link to="/findconnection" className="hover:text-[#A8DADC]">Find Connection</Link>
        <Link to="/chats" className="hover:text-[#A8DADC]">Chats</Link>

        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="hover:text-[#A8DADC] focus:outline-none"
          >
            Account
          </button>

          {isOpen && (
            <div className="absolute flex flex-col right-0 bg-white text-[#1D3557] mt-2 rounded-lg shadow-lg overflow-hidden min-w-35 z-50">
              <Link
                to={`/profile/${userId}`}
                className="px-4 py-2 hover:bg-[#A8DADC] hover:text-white"
                onClick={() => setIsOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="text-left px-4 py-2 hover:bg-red-500 hover:text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}