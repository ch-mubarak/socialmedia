import Chat from "../Models/chatModal.js";

export const createChat = async (req, res) => {
  const { senderId, receiverId } = req.body;

  if (!(senderId && receiverId)) {
    return res
      .status(401)
      .json({ message: "both senderId and receiverId is required" });
  }

  const newChat = new Chat({
    members: [req.body.senderId, req.body.receiverId],
  });

  try {
    const result = await newChat.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const userChat = async (req, res) => {
  try {
    const chat = await Chat.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};

export const findChat = async (req, res) => {
  const { firstId, secondId } = req.params;
  try {
    const chat = await Chat.findOne({
      members: { $all: [firstId, secondId] },
    });
    res.status(200).json({ chat });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
