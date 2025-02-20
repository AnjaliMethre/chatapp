import React, { useState, useEffect } from "react";
import Login from "./Login";
import Chat from "./Chat";

const Main = ({ socket }) => {
    const [newUser, setNewUser] = useState("");
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        socket.on("users", (users) => {
            const messagesArr = users.map(({ userId, username }) => ({
                type: "userStatus",
                userId,
                username,
            }));
            setMessages((prevMessages) => [...prevMessages, ...messagesArr]);
            setUsers(users);
        });

        socket.on("session", ({ userId, username }) => {
            setUser({ userId, username }); // ✅ FIXED: Properly setting user object
        });

        socket.on("user connected", ({ userId, username }) => {
            const newMessage = { type: "userStatus", userId, username };
            setMessages((prevMessages) => [...prevMessages, newMessage]); // ✅ FIXED
        });

        socket.on("new message", ({ userId, username, message }) => {
            const newMessage = {
                type: "message",
                userId,
                username,
                message,
            };
            setMessages((prevMessages) => [...prevMessages, newMessage]); // ✅ FIXED
        });

        return () => {
            socket.off("users");
            socket.off("session");
            socket.off("user connected");
            socket.off("new message");
        };
    }, [socket]);

    function logNewUser() {
        socket.auth = { username: newUser };
        socket.connect();
        console.log("logNewUser function called");
    }

    function sendMessage() {
        socket.emit("new message", message);
        const newMessage = {
            type: "message",
            userId: user.userId,
            username: user.username,
            message,
        };
        setMessages((prevMessages) => [...prevMessages, newMessage]); // ✅ FIXED
        setMessage("");
    }

    return (
        <main className="content">
            <div className="container mt-3">
                {user.userId ? (
                    <Chat
                        user={user}
                        message={message}
                        messages={messages}
                        setMessage={setMessage}
                        sendMessage={sendMessage}
                    />
                ) : (
                    <Login
                        newUser={newUser}
                        setNewUser={setNewUser}
                        logNewUser={logNewUser}
                    />
                )}
            </div>
        </main>
    );
};

export default Main;
