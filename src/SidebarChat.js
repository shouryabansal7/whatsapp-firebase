import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "./firebase";
import "./SidebarChat.css";
import {
  collection,
  query,
  where,
  onSnapshot,
  doc,
  getDoc,
  addDoc,
  FieldValue,
  orderBy,
} from "@firebase/firestore";

function SidebarChat(props) {
  const { addNewChat, id, name } = props;
  const [messages, setMessages] = useState([]);
  const [seed, setSeed] = useState("");

  useEffect(() => {
    if (id) {
      onSnapshot(doc(db, "rooms", id), (doc) => {
        const q = query(
          collection(doc.ref, "messages"),
          orderBy("timestamp", "desc")
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

      // onSnapshot(doc(db, "rooms", id), (doc) => {
      //   onSnapshot(
      //     collection(doc.ref, "messages"),
      //     orderBy("timestamp", "desc"),
      //     (snapshot) => {
      //       let messages = [];
      //       snapshot.docs.forEach((doc) => {
      //         messages.push({
      //           data: doc.data(),
      //         });
      //       });
      //       setMessages(messages);
      //     }
      //   );
      // });
    }
  }, [id]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const createChat = () => {
    const roomName = prompt("Please Enter name for chat");

    if (roomName) {
      addDoc(collection(db, "rooms"), {
        name: roomName,
      });
    }
  };

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar
          src={`https://avatars.dicebear.com/api/avataaars/${seed}.svg`}
        />
        <div className="sidebarChat_info">
          <h2>{name}</h2>
          <p>{messages[0]?.data.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Add New Chat</h2>
    </div>
  );
}

export default SidebarChat;
