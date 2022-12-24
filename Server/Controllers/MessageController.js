import Message from "../Models/messageModal.js";

export const addMessage = async (req, res) => {
  const { text, chatId, senderId } = req.body;
  if (!(text && chatId && senderId)) {
    return res.status(401).json({ message: "all felids are required" });
  }
  try {
    const message = new Message({
      chatId,
      senderId,
      text,
    });
    await message.save();
    res.status(201).json(message);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
export const getMessages = async (req, res) => {
  const { chatId } = req.params;
  try {
    const result = await Message.find({ chatId });
    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};
