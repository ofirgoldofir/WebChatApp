const express = require("express");
const server = express();
server.use(express.static("public"));
server.use(express.urlencoded({ extended: true }));
server.use(express.json());
const cors = require("cors");
server.use(cors());
//server.set('view engine', 'ejs')
// const bodyParser = require("body-parser");
server.use("/api/Tokens", require("./routes/TokensRoutes"));
server.use("/api/Chats", require("./routes/ChatsRoutes"));
server.use("/api/Users", require("./routes/UsersRoutes"));

const customEnv = require("custom-env");
customEnv.env(process.env.NODE_ENV, "./config");

// MongoDB
const mongoose = require("mongoose");
mongoose.connect(process.env.CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Sockets
const http = require("http");
const httpServer = http.createServer(server);

const { Server } = require("socket.io");

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "DELETE"],
  },
});

io.on("connection", (socket) => {
  console.log("a user connected, the socket id is:", socket.id);
  socket.on("join_room", (data) => {
    socket.join(data);
  })
  socket.on("send_message", (data) => {
    socket.to(data.receiver).emit("receive_message", data);
  });
  socket.on("add_contact", (data) => {
    socket.to(data.newContact).emit("receive_add_contact", data);
  });
  socket.on("delete_contact", (data) => {
    socket.to(data.contactToDelete).emit("receive_delete_contact", data);
  });
});



httpServer.listen(process.env.PORT);