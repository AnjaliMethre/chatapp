import React, {useState} from "react";
import Login from "./Login";
import Chat from "./Chat";

const Main = ()=>{
    const [newUser, setNewUser]=useState("");
    const[user, setUser]=useState("");
    const[message, setMessage] = useState("");

    function logNewUser(){
        setUser(newUser);
    }

    return (
        <main className="content">
      <div className="container mt-3">
        {user && 
          <Chat user={user} message={message} setMessage={setMessage} />
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