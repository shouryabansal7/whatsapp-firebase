import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  orderBy,
  query,
  QuerySnapshot,
} from "@firebase/firestore";
import {
  AttachFile,
  Mic,
  MoreVert,
  SearchOutlined,
  InsertEmoticon,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import "./Chat.css";
import db from "./firebase";
import { serverTimestamp } from "@firebase/firestore";
import { useStateValue } from "./StateProvider";

function Chat(props) {
  const [input, setInput] = useState("");
  const { roomId } = useParams();
  const [roomName, setRoomName] = useState("");
  const [messages, setMessages] = useState([]);
  const [{ user }, dispatch] = useStateValue();

  const [seed, setSeed] = useState("");

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, [roomName]);

  useEffect(() => {
    if (roomId) {
      onSnapshot(doc(db, "rooms", roomId), (doc) => {
        console.log("doc 1", doc);
        setRoomName(doc.data().name);
      });

      onSnapshot(doc(db, "rooms", roomId), (doc) => {
        const q = query(
          collection(doc.ref, "messages"),
          orderBy("timestamp", "asc")
        );
        onSnapshot(q, (querySnapshot) => {
          let messages = [];
          querySnapshot.forEach((doc) => {
            messages.push({
              data: doc.data(),
            });
          });
          setMessages(messages);
        });
      });

      // onSnapshot(doc(db, "rooms", roomId), (doc) => {
      //   console.log(doc.ref);
      //   onSnapshot(
      //     collection(doc.ref, "messages"),
      //     orderBy("timestamp", "desc"),
      //     (snapshot) => {
      //       console.log("snapshot", snapshot);
      //       let messages = [];
      //       snapshot.docs.forEach((doc) => {
      //         console.log("doc", doc.data());
      //         messages.push({
      //           data: doc.data(),
      //         });
      //       });
      //       console.log("messages", messages);
      //       console.log(user.displayName === "2K20_SE_131_Shourya Bansal");
      //       setMessages(messages);
      //     }
      //   );
      // });
    }
  }, [roomId]);

  const sendMessage = (e) => {
    e.preventDefault();
    console.log("You typped>>>>", input);

    onSnapshot(doc(db, "rooms", roomId), (doc) => {
      console.log(doc.ref);
      addDoc(collection(doc.ref, "messages"), {
        message: input,
        name: user.displayName,
        timestamp: serverTimestamp(),
      });

      setInput("");
    });
  };
  return (
    <div className="chat">
      <div className="chat_header">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />

        <div className="chat_headerInfo">
          <h3>{roomName}</h3>
          <p>
            Last seen{" "}
            {new Date(
              messages[messages.length - 1]?.data.timestamp?.toDate()
            ).toUTCString()}
          </p>
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
        {messages.map((message) => (
          //console.log(message.data.message);
          <p
            className={`chat_message ${
              message.data.name === user.displayName && "chat_receiver"
            }`}
          >
            <span className="chat_name">{message.data.name}</span>
            {message.data.message}
            <span className="chat_timestamp">
              {new Date(message.data.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
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
