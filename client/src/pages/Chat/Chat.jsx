"use client"

import { useContext, useState } from "react"
import "./Chat.css"
import LeftSidebar from "../../components/LeftSidebar/LeftSidebar"
import Chatbox from "../../components/Chatbox/Chatbox"
import RightSidebar from "../../components/RightSidebar/RightSidebar"
import { ChatContext } from "../../Context/ChatContext"
import { AuthContext } from "../../Context/AuthContext"
import "ldrs/jelly"

const Chat = () => {
  const { userChats, isUserChatsLoading, userChatsError, updateCurrentChat, currentChat } = useContext(ChatContext)
  const { user } = useContext(AuthContext)

  const [isRightSidebarOpen, setIsRightSidebarOpen] = useState(false)
  const [isChatboxVisible, setIsChatboxVisible] = useState(false)
  const [isChatVisible, setIsChatVisible] = useState(false)

  const toggleRightSidebar = () => setIsRightSidebarOpen(!isRightSidebarOpen)
  const toggleChatbox = () => setIsChatboxVisible(!isChatboxVisible)
  const toggleChatVisibility = () => setIsChatVisible(!isChatVisible)
  const handleChatSelect = (chat) => {
    updateCurrentChat(chat)
    setIsChatboxVisible(true) // Show chatbox when a chat is selected
  }
  const goBackToChatList = () => setIsChatboxVisible(false) // Back button to return to chat list

  if (isUserChatsLoading)
    return (
      <p className="Load">
        <l-jelly size="40" speed="0.9" color="#B224E5"></l-jelly>
      </p>
    )
  if (userChatsError) return <p>Error loading chats: {userChatsError}</p>

  return (
    <div className="chat">
      <div className="chat-container">
        {/* Desktop: Always show LeftSidebar */}
        <LeftSidebar user={user} chats={userChats} onChatSelect={handleChatSelect} />

        {/* Mobile: Show Chatbox only if a chat is selected */}
        {currentChat ? (
          <Chatbox toggleRightSidebar={toggleRightSidebar} goBack={() => setIsChatboxVisible(false)} />
        ) : (
          <p className="conversation">No conversation selected yet...</p>
        )}

        {/* RightSidebar (Only show when toggled) */}
        {isRightSidebarOpen && <RightSidebar />}
      </div>
    </div>
  )
}

export default Chat
