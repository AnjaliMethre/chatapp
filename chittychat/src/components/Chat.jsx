import React from 'react'

const Chat = ({ user }) => {
  return (
    <div className="card border-2 border-info w-100">
            <div className="row vh-95">
              <div className="col-12 col-lg-12 col-xl-12">
                {/*Chat header*/}
                <div className="py-2 px-4 w-100 border-bottom border-info d-lg-block sticky-top bg-white">
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
                {/*Chat header*/}

              </div>

            </div>
          </div>
  )
}

export default Chat;
