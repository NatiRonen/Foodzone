const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
require("./connection");
const { Server } = require("socket.io");
const { routesInit, corsAccessControl } = require("./routes/config_routes");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

routesInit(app);
corsAccessControl(app);

let port = process.env.PORT || "3002";
server.listen(port, () => {
  console.log("listening on " + port);
});

module.exports = { app, io };

require("./socket/socket");

// app.use((req, res) => {
//   res.status(404).json({ msg_error: "Url not found , 404!" });
// });
