import Chat from "../models/chatModel.js";

export const createChat = async (req, res) => {
  try {
    const { user1, user2 } = req.body;

    if (!user1 || !user2) {
      return res.status(400).json({ error: "Both users are required" });
    }

    let chat = await Chat.findOne({
      users: { $all: [user1, user2] },
    }).populate("users", "name avatar");

    if (!chat) {
      chat = await Chat.create({ users: [user1, user2] });
      chat = await Chat.findById(chat._id).populate("users", "name avatar");
    }

    res.status(200).json(chat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserChats = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID required" });
    }

    const chats = await Chat.find({ users: userId })
      .populate("users", "name avatar")
      .sort({ updatedAt: -1 });

    res.status(200).json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};