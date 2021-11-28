import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    //BEM naming convention
    <div className="app">
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
    </div>
  );
}

export default App;
