export default function ChatSidebar({ chats, selectContact, userId }) {
  return (
    <div className="w-1/3 border-r bg-[#f8f9fa] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-[#1D3557]">Chats</h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.length === 0 && (
          <p className="text-center text-gray-400 mt-10 text-sm">No chats yet</p>
        )}

        {chats.map((chat) => {
          const otherUser = chat.users.find((u) => u._id !== userId);
          if (!otherUser) return null;

          return (
            <div
              key={chat._id}
              onClick={() =>
                selectContact({
                  chatId: chat._id,
                  _id: otherUser._id,
                  name: otherUser.name,
                  avatar: otherUser.avatar,
                })
              }
              className="flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer border-b"
            >
              <img
                src={otherUser.avatar || "https://via.placeholder.com/40"}
                alt={otherUser.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <span className="font-semibold text-[#1D3557]">{otherUser.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
