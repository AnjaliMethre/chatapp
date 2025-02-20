//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//font-awesome
import "font-awesome/css/font-awesome.css";
import Main from "./components/Main";
import { io } from "socket.io-client";

//const socket = io("http://localhost:4000");
const socket = io("http://localhost:4000", {
  transports: ["websocket", "polling"]
});


function App() {
  
  return <Main socket={socket} />;
}

export default App;
