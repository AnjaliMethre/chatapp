import React, {useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";

const Main = ({ socket })=>{
    const [newUser, setNewUser]=useState("");
    const[user, setUser]=useState("");
    const[message, setMessage] = useState("");

    useEffect(()=>{
      socket.on("session", ({ userId, username})=>{
        setUser(username);
      });
    },[socket]);

    function logNewUser(){
        setUser(newUser);
        socket.auth = { username: newUser };
        socket.connect();
    }

    return (
        <main className="content">
      <div className="container mt-3">
        {user && <Chat user={user} message={message} setMessage={setMessage} />
        }
        {!user && (
          <Login
            newUser={newUser} 
            setNewUser={setNewUser}
            logNewUser={logNewUser} 
          />
        )}
        
      </div>
    </main>
    );
}

export default Main;