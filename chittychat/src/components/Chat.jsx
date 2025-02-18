import React from "react";
import ChatContainer from "./ChatContainer";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";

const Chat = ({ user, message, setMessage }) => {
  return (
          <ChatContainer>
            <ChatHeader user={user} />
            <ChatInput message={message} setMessage={setMessage} />
          </ChatContainer>
  );
};

export default Chat;
