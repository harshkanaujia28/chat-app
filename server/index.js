const express = require ('express')
const cors = require('cors')
const  {Server} = require("socket.io")
const mongoose = require ('mongoose')
const userRoute = require("./Routes/userRoute")
const chatRoute = require("./Routes/chatRoute")
const messageRoute= require("./Routes/messageRoute")
 

const app = express()
require('dotenv').config()

app.use(express.json())
app.use(cors())
app.use("/api/users", userRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req,res) =>{
    res.send("welcome out chat app Apis...")
})


const port = process.env.PORT || 5000;
const uri = process.env.MONGO_URI;

 const expressServer = app.listen(port, (req , res) =>{
    console.log(`server running on port: ${port}`);
    console.log(`MongoDB URI: ${uri}`)
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connection is established"))
.catch((error) => console.log('MongoDB connection failed:', error.message));

const io = new Server(expressServer,{ cors: process.env.CLIENT_URL, });
let onlineUsers = [];

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);

  socket.on("addNewUser", (userId) => {
    !onlineUsers.some((user) => user.userId === userId) &&
      onlineUsers.push({
        userId,
        socketId: socket.id,
      });
    console.log("onlineUsers", onlineUsers);

    io.emit("updateUsersList", onlineUsers);
  });
  socket.on("sendMessage", (message) => {
    const user = onlineUsers.find (user => user.userId === message.recipientId);

    if (user) {
      io.to(user.socketId).emit("receiveMessage", message);
      io.to(user.socketId).emit("getNotification", { 
        senderId: message.senderId,
        isRead: false,
        date: new Date(),
      });
    }
  });

  socket.on("disconnect", () => {
    onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
    io.emit("updateUsersList", onlineUsers);
  });
});


