const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const { createServer } = require('http')
const {Server} = require('socket.io')

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

//dot env config de khong public port chay server
dotenv.config();

//connect to server
connectDB();

//tao server moi
const app = express();

//cors
app.use(cors());

//accept JSON data
app.use(express.json());

//router api
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error Handling middlewares
//neu khong tim duoc url nao o tren dung voi url minh can thi return not found
app.use(notFound);

//xu ly loi neu khong thuoc truong hop not found o tren
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// const server = app.listen(PORT, () =>
//   console.log(`App running in port ${PORT}`)
// );

const httpServer = createServer(app);
//khoi tao socket.io
const io = new Server(httpServer, {
});


//bat socket.io
io.on("connection", (socket) => {
  // event 'setup' => callback function
  socket.on("setup", (userData) => {
    //tao 1 room cho user co user._id trong userData
    socket.join(userData._id);
    // sending to all people in userData listening to event "connected"
    socket.emit("connected");
  });

  //tao room theo id chat
  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("user join room: " + room);
  });

  //typing, stop typing
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  // get new message
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

httpServer.listen(PORT, () => {
  console.log("connect port: " + PORT)
})
