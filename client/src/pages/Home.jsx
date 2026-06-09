import HomeHero from "../components/HomeHero.jsx";
import HomeFeatures from "../components/HomeFeatures.jsx";
import HomePopularSkills from "../components/HomePopularSkills.jsx";
import HomeCallToAction from "../components/HomeCallToAction.jsx";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 text-[#212529] p-8 space-y-6">
      <HomeHero />
      <HomeFeatures />
      <HomePopularSkills />
      <HomeCallToAction />
    </div>
  );
}