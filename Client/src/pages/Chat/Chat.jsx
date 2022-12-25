import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { RightSide } from "../../components/RightSide/RightSide";
import "./Chat.css";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  const getChat = async () => {
    try {
      const { data } = await userChats();
      setRooms(data.chat);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getChat();
  }, [user]);
  return (
    <div className="chat">
      <div className="left-side-chat">
        <LogoSearch />
        <div className="chat-container">
          <h2>chats</h2>
          <div className="chat-list">
            {rooms.map((room) => {
              return (
                <div key={room._id} onClick={() => setCurrentRoom(room)}>
                  <Conversation room={room} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="right-side-chat">
        <div>
          <RightSide isFromChat={true} />
        </div>

        {/* chat body */}
        <ChatBox room={currentRoom} />
      </div>
    </div>
  );
};

export default Chat;
