import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";

function App() {
  return (
    //BEM naming convention
    <div className="app">
      <div className="app_body">
        {/* sidebar */}
        <Sidebar />
        {/* chat component */}
        <Chat />
      </div>
    </div>
  );
}

export default App;
