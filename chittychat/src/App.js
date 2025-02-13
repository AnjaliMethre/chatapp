//bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
//font-awesome
import "font-awesome/css/font-awesome.css";
//socket.io-client
//import { io } from "socket.io-client";
import React, { useState } from "react";
import Login from "./components/Login";

function App() {
  //username
  const [newUser, setNewUser]=useState("");
  const[user,setUser]=useState("");

  function handleChange({ currentTarget: input }) {
    setNewUser(input.value);

  }

  function logNewUser(){
    setUser(newUser);
  }

  return (
    <main className="content">
      <div className="container mt-3">
        {user && (
          <div className="card-w-100">
            <div className="row">
              <div className="col-12 col-lg-12 col-xl-12">
                <div className="py-2 px-4 w-100 border-bottom d-lg-block sticky-top bg-white">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img 
                        src="https://bootdey.com/img/Content/avatar/avatar3.png" 
                        className="rounded-circle mx-2"
                        alt={user}
                        width="40"
                        height="40" 
                      />
                    </div>
                    <div className="flex-grow-1">
                      <strong>Logged in as {user}</strong>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}
        {!user &&
          <Login
            newUser={newUser} 
            handleChange={handleChange} 
            logNewUser={logNewUser} 
          />
        }
        
      </div>
    </main>
  );
}

export default App;
