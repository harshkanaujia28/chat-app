import React, { useContext } from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets";
import { AuthContext } from "../../Context/AuthContext";
import { Link } from "react-router-dom";
import { useFetchRecipientUser } from "../../../hooks/userfetchRecipient";
import { ChatContext } from "../../Context/ChatContext";
import PotentialChats from "./PotentialChats";
import { UnreadNotificationsFunc } from "../../Utils/UnreadNotification";
import { useFetchLatestMessage } from "../../../hooks/usefetchLastMessage";
import moment from "moment";

const LeftSidebar = ({ onChatSelect, toggleChatbox }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const { updateCurrentChat, currentChat } = useContext(ChatContext);
  const { userChats, isUseChatsLoading, userChatsError } =
    useContext(ChatContext);

  return (
    <div className="LeftSidebar">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.profile_img} alt="" />
          <h3>{user?.name}</h3>
          <div className="menu">
            <img src={assets.menu_icon} alt="" />
            <div className="sub-menu">
              <Link
                to="/profileUpdate"
                style={{ textDecoration: "none", color: "black" }}
              >
                <p>Edit profile</p>
              </Link>
              <hr />
              {user && (
                <Link
                  to="/register"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <p onClick={() => logoutUser()}>Logout</p>
                </Link>
              )}
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="" />
          <input type="text" placeholder="search here" />
        </div>
      </div>

      <PotentialChats />

      <div className="ls-list">
        {userChats && userChats.length > 0 ? (
          userChats.map((chat, index) => {
            const { recipientUser } = useFetchRecipientUser(chat, user);
            const {
              onlineUsers,
              notifications,
              markThisUserNotificationsAsRead,
            } = useContext(ChatContext);
            const UnreadNotification = UnreadNotificationsFunc(notifications);
            const { latestMessage } = useFetchLatestMessage(chat);

            const thisUserNotification = UnreadNotification?.filter(
              (n) => n.senderId == recipientUser?._id
            );
            const isUserOnline = onlineUsers.some(
              (user) => user?.userId === recipientUser?._id
            ); 
            const truncateText = (text) => {
              let shortText = text.substring(0, 20);
              if (text.length > 20) {
                shortText += "...";
              }
              return shortText;
            };
            return (
              <div
                className="friends"
                key={index}
                onClick={() => {
                  if (thisUserNotification?.length !== 0) {
                    markThisUserNotificationsAsRead(
                      thisUserNotification,
                      notifications
                    );
                  }
                  updateCurrentChat(chat);
                  toggleChatbox();  // Open chatbox on click
                }}
              >
                <img src={assets.profile_img2} alt="profile" />
                <div className="chat-list">
                  <div className="Username">
                    <p className="U">{recipientUser?.name || "Unknown User"}</p>
                    {latestMessage?.text && (
                      <span className="noti">{truncateText(latestMessage?.text)}</span>
                    )}
                  </div>
                  <div className="note">
                    <div
                      className={
                        thisUserNotification?.length > 0 ? "notification" : ""
                      }
                    >
                      {thisUserNotification?.length > 0
                        ? thisUserNotification?.length
                        : ""}
                    </div>
                    <div className="date">
                      {moment(latestMessage?.createdAt).calendar()}
                    </div>
                  </div>
                </div>
                {isUserOnline ? (
                  <img src={assets.green_dot} alt="status" className="dot" />
                ) : (
                  ""
                )}
              </div>
            );
          })
        ) : (
          <div className="no-chats">No chats available</div>
        )}
      </div>
    </div>
  );
};

export default LeftSidebar;
