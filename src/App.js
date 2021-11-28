import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useState } from "react";
import Login from "./Login";
import { useStateValue } from "./StateProvider";

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    //BEM naming convention
    <div className="app">
      {!user ? (
        <h1>
          <Login />
        </h1>
      ) : (
        <div className="app_body">
          <BrowserRouter>
            {/* sidebar */}
            <Sidebar />
            <Routes>
              <Route
                path="/rooms/:roomId"
                element={
                  <React.Fragment>
                    {/* chat component */}
                    <Chat />
                  </React.Fragment>
                }
              ></Route>
              <Route path="/" element={<h1>Login</h1>} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
