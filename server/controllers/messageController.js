import Message from "../models/messageModel.js";

export const getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;

    const messages = await Message.find({ chatId })
      .populate("sender", "name avatar")
      .sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { chatId, sender, text } = req.body;

    if (!chatId || !sender || !text) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const message = await Message.create({ chatId, sender, text });

    const populated = await Message.findById(message._id)
      .populate("sender", "name avatar");

    res.status(201).json(populated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};