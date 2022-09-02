const mongoose = require("mongoose");
const { getFromattedDate } = require("../utils/Data&timeFormat");

let productScheam = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "can't be blank"],
      minLength: [2, "Name must be at least 2 letters, got {VALUE}"],
    },
    info: {
      type: "String",
      required: [true, "can't be blank"],
      minLength: [10, "info be at least 10 letters, got {VALUE}"],
    },
    price: {
      type: "Number",
      required: [true, "can't be blank"],
    },
    imgUrl: {
      type: "String",
      required: [true, "can't be blank"],
    },
    category: {
      type: "String",
      required: [true, "can't be blank"],
    },
    date_created: {
      type: Date,
      default: Date.now(),
    },
    store_short_id: String,
    short_id: String,
  },
  { minimize: false } //not droping empty objects
);

exports.ProductModel = mongoose.model("products", productScheam);
