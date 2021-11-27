import {
  AttachFile,
  Mic,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./Chat.css";

function Chat(props) {
  const [input, setInput] = useState("");

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typped>>>>", input);
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${7997}.svg`}
        />

        <div className="chat_headerInfo">
          <h3>Room Name</h3>
          <p>Last seen at....</p>
        </div>

        <div className="chat_headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat_body">
        <p className="chat_message">
          <span className="chat_name">Soumya</span>
          Hey Guys..
          <span className="chat_timestamp">3:52pm</span>
        </p>
        <p className={`chat_message ${true && "chat_receiver"}`}>
          <span className="chat_name">Shourya</span>
          Namaste
          <span className="chat_timestamp">3:53pm</span>
        </p>
      </div>
      <div className="chat_footer">
        <InsertEmoticon />
        <form>
          <input
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
            placeholder="Type a message"
            type="text"
          />
          <button onClick={sendMessage} type="submit">
            Send a message
          </button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
