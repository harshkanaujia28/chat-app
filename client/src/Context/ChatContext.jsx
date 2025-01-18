import { createContext, useCallback, useContext, useEffect, useState, } from "react";
import { baseUrl, getRequest, postRequest } from "../Utils/services";
import { io } from "socket.io-client";
export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
  const [userChats, setUserChats] = useState(null);
  const [userChatsError, setUserChatsError] = useState(null);
  const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
  const [potentialChats, setPotentialChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [messages, setMessages] = useState(null);
  const [isMessagesLoading, setIsMessagesLoading] = useState(false);
  const [messagesError, setMessagesError] = useState(null);
  const [sendTextMessagesError, setsendTextMessagesError] = useState(null);
  const [newMessages, setNewMessage] = useState(null);
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [allUsers, setAllUsers] = useState([])
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  console.log("notifications", notifications);
  // socket.io.connect
  useEffect(() => {
    const newSocket = io("http://localhost:3000");
    setSocket(newSocket);
    return () => {
      newSocket.disconnect();
    };
  }, [user]);
  //addonline users
  useEffect(() => {
    if (socket === null) return;
    socket.emit("addNewUser", user?._id);
    socket.on("updateUsersList", (res) => {
      setOnlineUsers(res);
    })
  }, [socket]);
  //send message 
  useEffect(() => {
    if (socket === null) return;
    const recipientId = currentChat?.members?.find((id) => id !== user?._id);

    socket.emit("sendMessage", { ...newMessages, recipientId })
  }, [newMessages]);

  //revieve message and notify user
  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        if (currentChat?._id === message.chatId) {
          setMessages((prev) => [...prev, message]);
        }
      });
      socket.on("getNotification", (res) => {
        const isChatOpen = currentChat?.members.some(id => id === res.senderId)
        if (isChatOpen) {
          setNotifications(prev => [{ ...res, isRead: true }, ...prev])
        } else {
          setNotifications(prev => [res, ...prev])
        }
      })
    }
    // return () =>{
    //   socket.off("recieveMessage");
    //   socket.off("getNotification");
    // }
  }
    , [socket, currentChat]);

  const sendTextMessage = useCallback(
    async (textMessage, sender, currentChatId, setTextMessage) => {
      if (!textMessage) return console.log("You must type a text message");

      const response = await postRequest(`${baseUrl}/messages`,
        JSON.stringify({
          text: textMessage,
          senderId: sender._id,
          chatId: currentChatId,
        })
      );
      if (response.error) {
        return setsendTextMessagesError(response);
      }
      setNewMessage(response);
      setMessages((prev) => [...prev, response]);
      setTextMessage("");
    },
    []
  );
  useEffect(() => {
    const getUsers = async () => {
      const response = await getRequest(`${baseUrl}/users`);

      if (response.error) {
        return console.log("Error fetching users", response);
      }

      const pChats = response.filter((u) => {
        let isChatCreated = false;

        if (user?._id === u._id) return false;

        if (userChats) {
          isChatCreated = userChats?.some((chat) => {
            return chat.members[0] === u._id || chat.members[1] === u._id;
          });
        }
        return !isChatCreated;
      });
      setPotentialChats(pChats);
      setAllUsers(response);
    };
    getUsers();
  }, [userChats]);

  useEffect(() => {
    const getUserChats = async () => {
      if (user?._id) {
        setIsUserChatsLoading(true);
        setUserChatsError(null);
        const response = await getRequest(`${baseUrl}/chats/${user?._id}`);

        setIsUserChatsLoading(false);

        if (response.error) {
          return setUserChatsError(response);
        }
        setUserChats(response);
      }
    };
    getUserChats();
  }, [user, notifications]);

  useEffect(() => {
    const getMessages = async () => {
      setIsMessagesLoading(true);
      setMessagesError(null);

      const response = await getRequest(
        `${baseUrl}/messages/${currentChat?._id}`
      );

      setIsMessagesLoading(false);

      if (response.error) {
        return setMessagesError(response);
      }
      setMessages(response);
    };

    getMessages();
  }, [currentChat]);

  const updateCurrentChat = useCallback((chat) => {
   // Debugging line
    setCurrentChat(chat); // Update the current chat state
  }, []);

  const createChat = useCallback(async (firstId, secondId) => {
    const response = await postRequest(
      `${baseUrl}/chats`,
      JSON.stringify({
        firstId,
        secondId,
      })
    );
    if (response.error) {
      return console.log("Error creating chat ", response);
    }
    setUserChats((prev) => [...prev, response]);
  }, []);
  const markAllNotificationsAsRead = useCallback(
    (notifications) => {
      const nNotification = notifications.map((n) => {
        return { ...n, isRead: true };
      })
      setNotifications(nNotification);
    },
    []);
  const markThisUserNotificationsAsRead = useCallback((thisUserNotification, notifications) => {
    const nNotifications = notifications.map(el => {
      let notification;
      thisUserNotification.forEach(n => {
        if (n.secondId === el.secondId) {
          notifications = { ...n, isRead: true };
        } else {
          notification = el;
        }

      });
      return notification;
    })
    setNotifications(nNotifications);
  }, [])

  useEffect(() => {
    if (query.trim() !== "") {
      const fetchUsers = async () => {
        try {
          // Perform the search API request
          const response = await fetch(`${baseUrl}/users/search?name=${query}`);

          if (!response.ok) {
            const data = await response.json();
            setError(data.message || "No users found.");
            setUsers([]); // Clear users if no results found
          } else {
            const data = await response.json();
            setUsers(data); // Set users from the response
            setError(""); // Clear any previous errors
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          setError("There was an error while searching.");
        }
      };

      // Trigger the fetch when query is updated
      fetchUsers();
    }
  }, [query]);

  return (
    <ChatContext.Provider
      value={{
        userChats,
        isUserChatsLoading,
        userChatsError,
        potentialChats,
        createChat,
        currentChat,
        updateCurrentChat,
        messages,
        isMessagesLoading,
        messagesError,
        sendTextMessage,
        onlineUsers,
        notifications,
        allUsers,
        markAllNotificationsAsRead,
        markThisUserNotificationsAsRead,
        query,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
