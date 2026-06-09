import { useState, useEffect } from "react";
import { Edit3, Save } from "lucide-react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function ProfileSkills({ userId }) {
  const [skillsOffered, setSkillsOffered] = useState([]);
  const [skillsWanted, setSkillsWanted] = useState([]);
  const [skillsInput, setSkillsInput] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const [selectedType, setSelectedType] = useState("offered");
  const token = localStorage.getItem("token");
  const loggedInUserId = localStorage.getItem("userId");
  const isOwner = loggedInUserId === userId;

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile/${userId}`);
        if (res.data?.user) {
          setSkillsOffered(res.data.user.skillsOffered || []);
          setSkillsWanted(res.data.user.skillsWanted || []);
          setIsSaved(true);
        }
      } catch (err) {
        console.error("Error fetching skills:", err);
      }
    };
    if (userId) fetchSkills();
  }, [userId]);

  const handleSave = async () => {
    if (!skillsInput.trim()) return;

    const skillList = skillsInput
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const body = selectedType === "offered"
      ? { skillsOffered: skillList }
      : { skillsWanted: skillList };

    try {
      await axios.put(`${API_URL}/api/profile/${userId}`, body, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (selectedType === "offered") setSkillsOffered(skillList);
      else setSkillsWanted(skillList);

      setSkillsInput("");
      setIsSaved(true);
    } catch (err) {
      console.error("Error saving skills:", err);
    }
  };

  return (
    <div className="px-8 pb-10 border-t border-gray-200">
      <div className="flex justify-between items-center mb-5 mt-5">
        <h2 className="text-xl font-semibold text-gray-800">Skills</h2>
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

      {isOwner && !isSaved && (
        <>
          <div className="flex gap-3 mb-3">
            <button
              onClick={() => setSelectedType("offered")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                selectedType === "offered"
                  ? "bg-[#457B9D] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Offered
            </button>
            <button
              onClick={() => setSelectedType("wanted")}
              className={`px-4 py-2 rounded-lg text-sm font-semibold ${
                selectedType === "wanted"
                  ? "bg-[#457B9D] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              Wanted
            </button>
          </div>
          <textarea
            value={skillsInput}
            onChange={(e) => setSkillsInput(e.target.value)}
            placeholder="Enter skills separated by commas (e.g. React, Node, UI/UX)"
            className="w-full p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#457B9D]"
            rows="3"
          />
        </>
      )}

      {isSaved && (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#1D3557] mb-2">Offered Skills</h3>
            {skillsOffered.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skillsOffered.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-[rgb(231,249,244)] text-[#457B9D] rounded-lg text-center shadow-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No offered skills yet.</p>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#1D3557] mb-2">Wanted Skills</h3>
            {skillsWanted.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {skillsWanted.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-[#c9defd] text-[#1D3557] rounded-lg text-center shadow-sm font-semibold">
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No wanted skills yet.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}