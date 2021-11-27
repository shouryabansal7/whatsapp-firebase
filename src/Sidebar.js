import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import {
  DonutLarge,
  Chat,
  MoreVert,
  SearchOutlined,
} from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import SidebarChat from "./SidebarChat";
import db from "./firebase";
import { collection, onSnapshot } from "@firebase/firestore";

function Sidebar(props) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    // getDocs(collection(db, "rooms"))
    //   .then((snapshot) => {
    //     let rooms = [];
    //     snapshot.docs.forEach((doc) => {
    //       rooms.push({
    //         id: doc.id,
    //         data: doc.data(),
    //       });
    //     });
    //     setRooms(rooms);
    //   })
    //   .catch((err) => {
    //     console.log(err.message);
    //   });

    onSnapshot(collection(db, "rooms"), (snapshot) => {
      let rooms = [];
      snapshot.docs.forEach((doc) => {
        rooms.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      setRooms(rooms);
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar_header">
        <Avatar />
        <div className="sidebar_headerRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <Chat />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="sidebar_search">
        <div className="sidebar_searchContainer">
          <SearchOutlined />
          <input placeholder="Search or Start new Chat" type="text" />
        </div>
      </div>
      <div className="sidebar_chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
