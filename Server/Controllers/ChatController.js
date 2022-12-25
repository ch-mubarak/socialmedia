import Chat from "../Models/chatModal.js";

export const createChat = async (req, res) => {
  const { receiverId } = req.body;
  const { userId } = req.user;

  if (!receiverId) {
    return res.status(401).json({ message: "invalid receiver id" });
  }

  const newChat = new Chat({
    members: [userId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const userChat = async (req, res) => {
  const { userId } = req.user;
  try {
    const chat = await Chat.find({
      members: { $in: userId },
    });
    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const findChat = async (req, res) => {
  const { receiverId } = req.params;
  const { userId } = req.user;
  try {
    const chat = await Chat.findOne({
      members: { $all: [userId, receiverId] },
    });
    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
