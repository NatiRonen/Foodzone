const express = require("express");
const { auth, payPalAuth, authAdmin, authStoreAdmin, authCourier } = require("../middlewares/auth");
const { genShortId } = require("../utils/genShortId");
const { OrderModel } = require("../models/orderModel");
const { ProductModel } = require("../models/productModel");
const { StoreModel } = require("../models/storeModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();

router.get("/sotreOrders/:store_id", authStoreAdmin, async (req, res) => {
  let store_short_id = req.params.store_id;
  let perPage = req.query.perPage || 10;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  let status = req.query.status;

  try {
    let filter = { store_short_id };
    filter = status
      ? { ...filter, status }
      : {
          ...filter,
        };
    let data = await OrderModel.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort({
        [sort]: reverse,
      });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/userOrder", auth, async (req, res) => {
  try {
    let data = await OrderModel.find({
      user_id: req.tokenData._id,
    })
      .limit(20)
      .sort({
        _id: -1,
      }); //return the last 20 orders
    res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

router.get("/allOrders", auth, async (req, res) => {
  let perPage = req.query.perPage || 10;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  let user_id = req.query.user_id;
  let status = req.query.status;
  let courier = req.query.courier;

  try {
    let filter = user_id ? { user_id } : {};
    filter = status
      ? { ...filter, status }
      : {
          ...filter,
        };
    filter = courier
      ? { ...filter, courier }
      : {
          ...filter,
        };
    let data = await OrderModel.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort({
        [sort]: reverse,
      });
    res.json(data);
  } catch (error) {
    res.status(500).json(error);
  }
});

// get the store with the orders
router.get("/storesWithOrders", async (req, res) => {
  try {
    // get all orders
    let allOrders = await OrderModel.find({ status: "paid" });
    // get all stores
    let allStores = await StoreModel.find({});
    let data = [];

    allStores.forEach((store) => {
      // create empty array to save each store's orders
      let ordersArr = [];
      allOrders.forEach((order) => {
        if (store.short_id === order.store_short_id) {
          ordersArr.push(order);
        }
      });
      // push all storse with orders
      if (ordersArr.length > 0) {
        data.push({ store: store, orders: ordersArr });
      }
    });

    res.json({ data });
  } catch (error) {
    res.status(500).json(error);
  }
});

// return the orders' amount
router.get("/allOrdersCount", auth, async (req, res) => {
  try {
    let amount = await OrderModel.countDocuments({});
    res.json({
      amount,
    });
  } catch (error) {
    log.error(error);
    return res.status(500).json(error);
  }
});

// get order details store info and user name and email
router.get("/deliveryInfo/:idOrder", authCourier, async (req, res) => {
  try {
    let order = await OrderModel.findOne({
      _id: req.params.idOrder,
    });
    let store = await StoreModel.findOne({
      short_id: order.store_short_id,
    });
    let user = await UserModel.findOne({ short_id: order.client_short_id }, { name: 1, phone: 1 });
    res.status(200).json({ order, store, user });
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/productsInfo/:idOrder", auth, async (req, res) => {
  try {
    let order = await OrderModel.findOne({
      _id: req.params.idOrder,
    });
    res.status(200).json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    const { name, address, phone, short_id: client_short_id } = user;
    req.body = { ...req.body, name, address, phone, client_short_id };
    let order = await OrderModel.findOne({
      status: "pending",
    });
    if (order) {
      // update
      let data = await OrderModel.updateOne(
        {
          _id: order._id,
        },
        req.body
      );
      return res.json(data);
    }
    // add new order
    let newOrder = new OrderModel(req.body);
    newOrder.short_id = await genShortId(OrderModel);
    await newOrder.save();
    return res.status(201).json(newOrder);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.patch("/orderPaid", auth, async (req, res) => {
  let status = "paid";
  try {
    //check if paypal did the transaction
    let tokenId = req.body.tokenId;
    let orderId = req.body.orderId;
    let realPay = req.body.realPay == "yes"; // true or false
    let paypalData = await payPalAuth(tokenId, orderId, realPay);
    if (paypalData.status != "COMPLETED") {
      res.status(401).json({
        err_msg: "There is problem with the transaction",
      });
    }
    // get the ids of the penging order
    let currentOrder = await OrderModel.findOne({
      status: "pending",
      user_id: req.tokenData._id,
    });
    let shorProds_ids = currentOrder.products_ar.map((item) => {
      return item.s_id;
    });
    //get the details of the products
    let prod_ar = await ProductModel.find({
      short_id: {
        $in: shorProds_ids,
      },
    });
    //substruct 1 from each product
    prod_ar.forEach(async (item) => {
      item.qty -= 1;
      // update the new quantity
      await ProductModel.updateOne(
        {
          _id: item._id,
        },
        item
      );
    });
    //update the status to paid
    let data = await OrderModel.updateOne(
      {
        status: "pending",
        user_id: req.tokenData._id,
      },
      {
        status,
      }
    ); //shortcut becouse is same name
    // modifiedCount
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// route update order status
// ?status =
router.patch("/:orderId", auth, async (req, res) => {
  let status = req.query.status || "pending";
  let updateObj = { status };
  let orderId = req.params.orderId;
  if ((status = "on_the_way")) {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    updateObj = { ...updateObj, courier_short_id: user.short_id };
  }
  try {
    let data = await OrderModel.updateOne(
      {
        _id: orderId,
      },
      updateObj
    ); //shortcut becouse is same name
    // modifiedCount
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/:delId", authAdmin, async (req, res) => {
  try {
    let data = await OrderModel.deleteOne({
      _id: orderId,
    });
    // modifiedCount
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
