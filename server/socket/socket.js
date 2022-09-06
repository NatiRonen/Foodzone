const { app, io } = require("../app");
const { authAdmin } = require("../middlewares/auth");
const { ForumModel } = require("../models/forumModel");
const MessageModel = require("../models/messageModel");

app.get("/chat/rooms", async (req, res) => {
  try {
    let forums = await ForumModel.find();
    res.status(200).json(forums);
  } catch (error) {
    res.status(500).json(error);
  }
});

const getLastMessagesFromRoom = async (room) => {
  let roomMessages = await MessageModel.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);
  return roomMessages;
};

const sortRoomMessagesByDate = (messages) => {
  return messages.sort((a, b) => {
    // console.log(a);
    let date1 = a._id.split("/");
    let date2 = b._id.split("/");

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
};

io.on("connection", (socket) => {
  //inform the all user about new user
  console.log("user whit id" + socket.id + " connects");

  socket.on("join-room", async (room, roomData) => {
    socket.leaveAll();
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
    let roomMessages = await getLastMessagesFromRoom(room);
    console.log(roomMessages);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    console.log(roomMessages);
    socket.emit("room-messages", roomMessages, roomData);
  });

  socket.on("message-room", async (room, content, sender, time, date) => {
    console.log("new-message-room", content);
    const newMessage = await MessageModel.create({
      content,
      from: sender,
      time,
      date,
      to: room,
    });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    //sending messages to room
    io.to(room).emit("room-messages", roomMessages);
    //emit event to room exscept the sender
    socket.broadcast.emit("notifications", room);
  });
  app.post("/chat/addRmoveRoom/", authAdmin, async (req, res) => {
    let forum = req.body;
    try {
      let forumExists = await ForumModel.findOne(forum);
      if (forumExists) {
        await ForumModel.deleteOne(forum);
      } else {
        newForum = new ForumModel(forum);
        await newForum.save();
      }
    } catch (error) {
      res.status(500).json(error);
    }
    let forums = await ForumModel.find();
    socket.broadcast.emit("update-forums", forums);
    res.status(200).send();
  });

  //orders
  socket.on("join-room-orders", (room) => {
    socket.join(room);
    console.log(`${socket.id} joined room ${room}`);
  });
  socket.on("new-order", (room) => {
    io.to(room).emit("new-order");
  });
  socket.on("status-changed", (room, newStatus, duration, durationInSec) => {
    console.log("status-changed", room, newStatus, durationInSec);
    io.to(room).emit("status-changed", newStatus, durationInSec);
  });
  socket.on("status-changed-msg", (room, newStatus) => {
    console.log("status-changed-msg", room, newStatus);
    io.to(room).emit("status-changed-msg", room, newStatus);
  });
});
