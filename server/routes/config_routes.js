const indexR = require("./index");
const usersR = require("./users");
const productsR = require("./products");
const categoriesR = require("./categories");
const storeR = require("./stores");
const favR = require("./favProducts");
const ordersR = require("./orders");

exports.routesInit = (app) => {
  app.use("/", indexR);
  app.use("/users", usersR);
  app.use("/stores", storeR);
  app.use("/products", productsR);
  app.use("/categories", categoriesR);
  app.use("/orders", ordersR);
  app.use("/favs", favR);
};
