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
  app.all(process.env.CLIENT_URL, function (req, res, next) {
    if (!req.get("Origin")) return next();

    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-credentials", true);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, auth-token, Accept, Authorization"
    );
    if (req.method === "OPTIONS") {
      res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
      return res.status(200).json({});
    }
    next();
  });
};
