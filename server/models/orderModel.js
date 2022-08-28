const mongoose = require("mongoose");
const { getFormatedTime, getFromattedDate } = require("../utils/Data&timeFormat");

const orderSchema = new mongoose.Schema({
  products_ar: {
    type: Array,
    required: [true, "can't be blank"],
  },
  client_short_id: String,
  status: {
    type: "String",
    default: "pending",
  },
  total_price: Number,
  date_created: {
    type: "String",
    default: getFormatedTime() + " " + getFromattedDate(),
  },
  short_id: String,
  store_short_id: {
    type: "String",
    required: [true, "can't be blank"],
  },
  courier_short_id: String,
  destination: {
    type: "String",
    required: [true, "can't be blank"],
  },
});

exports.OrderModel = mongoose.model("orders", orderSchema);
