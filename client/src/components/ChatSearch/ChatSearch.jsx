// import React, { useState, useEffect, useContext } from 'react';
// import { baseUrl, getRequest} from "../../Utils/services";
// import { AuthContext } from '../../Context/AuthContext';
// import { ChatContext } from '../../Context/ChatContext';

// function ChatSearch() {
//   const [potentialChats, setPotentialChats] = useState([]);
//   const { user } = useContext(AuthContext);
//   const { userChats } = useContext(ChatContext);
//   const [allUsers, setAllUsers] = useState([]);
//   const [searchQuery, setSearchQuery] = useState(""); // Search query state

//   useEffect(() => {
//     const getUsers = async () => {
//       const response = await getRequest(`${baseUrl}/users`);

//       if (response.error) {
//         return console.log("Error fetching users", response);
//       }

//       // Filter users based on potential chats and search query
//       const filteredUsers = response.filter((u) => {
//         let isChatCreated = false;

//         // Avoid showing current user
//         if (user?._id === u._id) return false;

//         // Check if the chat already exists
//         if (userChats) {
//           isChatCreated = userChats?.some((chat) => {
//             return chat.members[0] === u._id || chat.members[1] === u._id;
//           });
//         }

//         // Check if username exists before calling toLowerCase
//         return (
//           !isChatCreated &&
//           u.username && // Ensure username exists
//           u.username.toLowerCase().includes(searchQuery.toLowerCase()) // Search by username
//         );
//       });

//       setPotentialChats(filteredUsers);
//       setAllUsers(response);
//     };

//     getUsers();
//   }, [userChats, searchQuery]); // Add searchQuery as a dependency

//   const handleSearchChange = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   return (
//     <div>
//       <input
//         type="text"
//         placeholder="Search users"
//         value={searchQuery}
//         onChange={handleSearchChange}
//       />
//       <ul>
//         {potentialChats.map(chat => (
//           <li key={chat._id}>{chat.username}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default ChatSearch;