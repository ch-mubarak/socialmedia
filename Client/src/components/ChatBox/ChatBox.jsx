import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { getUserDetails } from "../../api/UserRequest";

const ChatBox = ({ currentRoom }) => {
  const { user } = useSelector((state) => state.authReducer.authData);
  const [memberData, setMemberData] = useState(null);
  const memberId = currentRoom?.members?.find((id) => id !== user._id);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const { data } = await getUserDetails(memberId);
        setMemberData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUserData();
  }, [currentRoom, user]);
  return <div>ChatBox</div>;
};

export default ChatBox;
