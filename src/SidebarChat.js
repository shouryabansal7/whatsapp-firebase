import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./SidebarChat.css";

function SidebarChat(props) {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please Enter name for chat");

    if (roomName) {
      //do something ever
    }
  };

  const { addNewChat } = props;
  return !addNewChat ? (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`} />
      <div className="sidebarChat_info">
        <h2>Room Name</h2>
        <p>This is the last message</p>
      </div>
    </div>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
