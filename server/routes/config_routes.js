const indexR = require("./index");
const usersR = require("./users");
const productsR = require("./products");
const storeR = require("./stores");
const favR = require("./favProducts");
const ordersR = require("./orders");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/stores", storeR);
  app.use("/products", productsR);
  app.use("/orders", ordersR);
  app.use("/favs", favR);
};

exports.corsAccessControl = (app) => {
  app.all("*", function (req, res, next) {
    if (!req.get("Origin")) return next();

    res.set("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
    res.set("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,auth-token");
    next();
  });
};
