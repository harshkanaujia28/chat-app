import React, { useState, useEffect, useContext, useRef } from "react";
import moment from "moment";
import "./Chatbox.css";
import assets from "../../assets/assets";
import { Link } from "react-router-dom";
import { ChatContext } from "../../Context/ChatContext";
import { useFetchRecipientUser } from "../../../hooks/userfetchRecipient";
import { AuthContext } from "../../Context/AuthContext";
import InputEmoji from "react-input-emoji"

function Chatbox({ toggleRightSidebar }) {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, addMessage, isMessagesLoading, sendTextMessage } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);
  const {
    onlineUsers,
    notifications,
    markThisUserNotificationsAsRead,
  } = useContext(ChatContext);
  const isUserOnline = onlineUsers.some(
    (user) => user?.userId === recipientUser?._id
  ); 

  const [textMessage, setTextMessage] = useState("");
  const scroll = useRef();

  useEffect(()=>{
    scroll.current?.scrollIntoView({behavior: "smooth"})
  },[messages])

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (textMessage.trim()) {
      await sendTextMessage(textMessage, user, currentChat._id, setTextMessage);
      setTextMessage("");
    }
  };
  
  

  useEffect(() => {}, [recipientUser]);

  if (!recipientUser) {
    return <p className="conversation">No conversation selected yet..</p>;
  }

  if (isMessagesLoading) {
    return <p className="conversation">Loading your Chat....</p>;
  }

  // Helper function to format timestamps
  const formatTimestamp = (timestamp) => {
    const messageDate = moment(timestamp);
    if (messageDate.isSame(moment(), "day")) {
      return messageDate.format("h:mm A"); // Only time for today
    }
    return messageDate.format("MMM D, h:mm A"); // Date and time for older messages
  };
  
  return (
    <div className="chatbox">
      <div className="chat-user">
        <img src={assets.profile_img2} alt="" />
        <p>
          {recipientUser?.name || "Unknown User"}{" "}
          {isUserOnline ? (
                  <img src={assets.green_dot} alt="status" className="dot" />
                
                ) : (
                  ""
                )}
        </p>
        <Link to="#" onClick={toggleRightSidebar}>
          <img src={assets.help_icon} className="help" alt="Help Icon" />
        </Link>
      </div>
      
      {/* Messages Section */}
      <div className="chat-content">
  {messages?.map((msg, index) => (
    <div key={index} className={msg?.senderId === user?._id? "s-msg" : "r-msg"} ref={scroll}>
      <p className="msg">{msg.text}</p>
      <div>
        <img
          src={msg.isReceived ? assets.profile_img : assets.profile_img2}
          alt=""
        />
        <p>{moment(msg.createdAt).calendar()}</p>
      </div>
    </div>
  ))}
</div>


      {/* Chat Input */}
      <div className="chat-input">
        <form onSubmit={handleSendMessage}>
          <InputEmoji
            type="text"
            value={textMessage}
            onChange={setTextMessage}
          
          />
         
          <button type="submit" >
            <img src={assets.send_button} className="imag" alt="Send" />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chatbox;
