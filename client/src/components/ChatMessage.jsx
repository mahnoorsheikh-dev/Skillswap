export default function ChatMessage({ text, sender, avatar, isOwn }) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"} mb-3`}>
      {!isOwn && (
        <img
          src={avatar || "https://ui-avatars.com/api/?size=40&name=User"}
          alt={sender?.name || "User"}
          className="w-10 h-10 rounded-full mr-2 object-cover"
        />
      )}

      <div
        className={`px-4 py-2 rounded-lg max-w-xs text-sm ${
          isOwn
            ? "bg-[#457B9D] text-white rounded-br-none"
            : "bg-gray-200 text-[#1D3557] rounded-bl-none"
        }`}
      >
        {text}
      </div>

      {isOwn && (
        <img
          src="https://ui-avatars.com/api/?size=40&name=You"
          alt="You"
          className="w-10 h-10 rounded-full ml-2 object-cover"
        />
      )}
    </div>
  );
}