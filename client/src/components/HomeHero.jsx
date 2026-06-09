import { useNavigate } from "react-router-dom";

export default function HomeHero() {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-r from-[#1D3557] to-[#457B9D] rounded-2xl p-10 text-center min-h-125 flex flex-col justify-center">
      <h2 className="text-5xl font-bold text-white pb-4">Welcome to SkillSwap</h2>
      <p className="text-white mt-2 max-w-2xl mx-auto pb-2">
        SkillSwap is a platform where people connect to teach what they know and learn what they don't — for free.
      </p>
      <button
        onClick={() => navigate("/auth")}
        className="mt-6 bg-[#f1faee] hover:bg-[#e9ecef] text-[#1D3557] font-bold py-3 px-8 rounded-2xl text-lg transition mx-auto"
      >
        Get Started
      </button>
    </div>
  );
}