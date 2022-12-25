import "./Chat.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { userChats } from "../../api/ChatRequest";
import ChatBox from "../../components/ChatBox/ChatBox";
import Conversation from "../../components/Conversation/Conversation";
import LogoSearch from "../../components/LogoSearch/LogoSearch";
import { RightSide } from "../../components/RightSide/RightSide";
import { io } from "socket.io-client";

const Chat = () => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [rooms, setRooms] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [sendMessage, setSendMessage] = useState(null);
  const [receiveMessage, setReceiveMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("http://localhost:8080");
    socket.current.emit("addNewUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(users);
    });
  }, [user]);

  useEffect(() => {
    const getChat = async () => {
      try {
        const { data } = await userChats();
        setRooms(data.chat);
      } catch (error) {
        console.log(error);
      }
    };
    getChat();
  }, [user]);

  //send message to socket server
  useEffect(() => {
    if (sendMessage) {
      socket.current.emit("sendMessage", sendMessage);
    }
  }, [sendMessage]);

  //receive message from socket server
  useEffect(() => {
    socket.current.on("receiveMessage", (data) => {
      setReceiveMessage(data);
    });
  }, []);
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
        <div className="chat-notification">
          <RightSide isFromChat={true} />
        </div>

        {/* chat body */}
        <ChatBox
          room={currentRoom}
          setSendMessage={setSendMessage}
          receiveMessage={receiveMessage}
        />
      </div>
    </div>
  );
};

export default Chat;
