import React from 'react'
import chatHeader from './chatHeader';
import ChatInput from './ChatInput';
import ChatContainer from './ChatContainer';


const Chat = ({ user, message, setMessage }) => {
  return (
          <ChatContainer>
            <chatHeader user={user} />
            <ChatInput message={message} setMessage={setMessage} />
          </ChatContainer>
  )
}

export default Chat;
