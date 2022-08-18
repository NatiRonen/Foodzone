const express = require("express");
const path = require("path");
const http = require("http");
const cors = require("cors");
require("./connection");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoDBStore = require("connect-mongodb-session")(session);
const { Server } = require("socket.io");
const { routesInit, corsAccessControl } = require("./routes/config_routes");
const { env } = require("process");

const app = express();

const server = http.createServer(app);

//the defualt is to sotre in memory sotre
const store = new MongoDBStore({
  uri: process.env.DB,
  collection: "sessions",
});
store.on("error", function (error) {
  console.log(error);
});

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use((req, res, next) => {
  // if (!req.get("Origin")) return next();
  res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Request-Headers", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, auth-token, Accept, Authorization ,X-Custom-Header, id-store, x-api-key"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    return res.status(200).json({});
  }
  next();
});
// app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.options("*", cors());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    method: ["GET", "POST", "DELETE", "PATCH", "PUT"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);
app.set("trust proxy", 1);
app.use(
  session({
    name: process.env.SESSION_NAME,
    secret: process.env.SESSION_SECRET, //sigh the cookie
    resave: false,
    saveUninitialized: false, //store session only if initialized
    cookie: {
      maxAge: 1000 * 60 * 15 * 1000, // 15 minutes
      sameSite: "none",
      secure: true,
      httpOnly: false,
    },
    store: store,
  })
);
// corsAccessControl(app);
routesInit(app);

let port = process.env.PORT || "3002";
server.listen(port, () => {
  console.log("listening on " + port);
});

module.exports = { app, io };

require("./socket/socket");

// app.use((req, res) => {
//   res.status(404).json({ msg_error: "Url not found , 404!" });
// });
