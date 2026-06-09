import { useParams } from "react-router-dom";
import ProfileHeader from "../components/ProfileHeader.jsx";
import ProfileInfo from "../components/ProfileInfo.jsx";
import ProfileAbout from "../components/ProfileAbout.jsx";
import ProfileSkills from "../components/ProfileSkills.jsx";

export default function Profile() {
  const { userId } = useParams();

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
        <ProfileHeader userId={userId} />
        <ProfileInfo userId={userId} />
        <ProfileAbout userId={userId} />
        <ProfileSkills userId={userId} />
      </div>
    </div>
  );
}