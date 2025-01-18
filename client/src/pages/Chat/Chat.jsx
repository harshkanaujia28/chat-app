import React, { useContext, useState } from "react";
import "./Chat.css";
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar";
import Chatbox from "../../components/Chatbox/Chatbox";
import RightSidebar from "../../components/RightSidebar/RightSidebar";
import { ChatContext } from "../../Context/ChatContext";
import { AuthContext } from "../../Context/AuthContext";
import 'ldrs/jelly'

// Default values shown  


const Chat = () => {
  const {
    userChats,
    isUserChatsLoading,
    userChatsError,
    updateCurrentChat,
    currentChat,
  } = useContext(ChatContext);
  const { user } = useContext(AuthContext);

  // State to toggle the visibility of the RightSidebar
  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false);

  // Handle click on the help icon
  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen);

  if (isUserChatsLoading) return <p className="Load"><l-jelly size="40" speed="0.9" color="#B224E5" ></l-jelly></p>; // Handle loading state
  if (userChatsError) return <p>Error loading chats: {userChatsError}</p>; // Handle error state

  return (
    <div className="chat">
      <div className="chat-container">
        {/* Render LeftSidebar */}
        <LeftSidebar user={user} chats={userChats} />

        {/* Ensure Chatbox is rendered only when there is an active chat */}
        {currentChat ? (
          <Chatbox toggleRightSidebar={toggleRightSidebar} />
        ) : (
          <p className="conversation">No conversation selected yet...</p>
        )}

        {/* Conditionally render the RightSidebar */}
        {isRightSidebarOpen && <RightSidebar />}
      </div>
    </div>
  );
};

export default Chat;
