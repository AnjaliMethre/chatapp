import React from 'react'
import chatHeader from './chatHeader';
import ChatInput from './ChatInput';

const Chat = ({ user, message, setMessage }) => {
  return (
    <div className="card border-2 border-info w-100">
            <div className="row vh-95">
              <div className="d-flex flex-column col-12 col-lg-12 col-xl-12">
               {/*chat Header*/}
               <chatHeader user={user} />
               {/*chat Header*/}
                
              </div>

            </div>
          </div>
  )
}

export default Chat;
