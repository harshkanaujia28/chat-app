import React, { useContext } from 'react'
import Chat from '../src/pages/Chat/Chat'
import Login from '../src/pages/Login/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './App.css'
import Register from './pages/Register/Register';
import { AuthContext } from './Context/AuthContext';
import RightSidebar from './components/RightSidebar/RightSidebar';
import ProfileUpdate from './pages/Profile update/ProfileUpdate'
import { ChatContextProvider } from './Context/ChatContext';
import Chatbox from './components/Chatbox/Chatbox';
import EmojiPicker from 'emoji-picker-react';
const App = () => {
  const {user} = useContext(AuthContext)

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
       { user ? <Chat/> : <Login/> }
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
         { user ? <Chat/> :<Register/>}
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          {user ? <Chat/> : <Login/>}
        </>
      ),
    },
    {
      path: "/rightSidebar",
      element: (
        <>
          <RightSidebar/>
        </>
      ),
    },
    {
      path: "/register",
      element: (
        <>
          <Register/>
        </>
      ),
    },
    {
      path: "/profileUpdate",
      element: (
        <>
        <ProfileUpdate/>
        </>
      ),
    },
    {
      path: "/chatbox",
      element: (
        <>
        <Chatbox/>
        </>
      ),
    },
  ]);
 
  return (
    <>
    <ChatContextProvider user={user}>
       <RouterProvider router={router} />
       <ToastContainer />

       </ChatContextProvider>
     
    </>
  )
}

export default App


































// import React, { useState, useEffect } from 'react';
// import io from 'socket.io-client';

// const socket = io.connect('http://localhost:3001');

// function App() {
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         socket.on('message', (message) => {
//             setMessages((prevMessages) => [...prevMessages, message]);
//         });

//         return () => {
//             socket.off('message');
//         };
//     }, []);

//     const sendMessage = (e) => {
//         e.preventDefault();
//         if (message.trim()) {
//             socket.emit('message', message);
//             setMessage('');
//         }
//     };

//     return (
//         <div className="App">
//             <h1>Socket.io Chat</h1>
//             <div>
//                 {messages.map((msg, index) => (
//                     <p key={index}>{msg}</p>
//                 ))}
//             </div>
//             <form onSubmit={sendMessage}>
//                 <input
//                     type="text"
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     placeholder="Type a message..."
//                 />
//                 <button type="submit">Send</button>
//             </form>
//         </div>
//     );
// }

// export default App;
