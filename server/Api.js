const express = require ('express')
const cors = require('cors')
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

app.listen(port, (req , res) =>{
    console.log(`server running on port: ${port}`);
    console.log(`MongoDB URI: ${uri}`)
})

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB connection is established"))
.catch((error) => console.log('MongoDB connection failed:', error.message));
