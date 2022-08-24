const mongoose = require("mongoose");
const { isEmail } = require("validator");
const { getFromattedDate } = require("../utils/Data&timeFormat");
let storeSchema = new mongoose.Schema(
  {
    name: {
      type: "String",
      required: [true, "can't be blank"],
      minLength: [2, "Name must be at least 2 letters, got {VALUE}"],
    },
    email: {
      type: "String",
      lowercase: true, // lowercase the string before saving
      unique: true,
      required: [true, "can't be blank"],
      index: true,
      validate: [isEmail, "invalid email"],
    },
    address: {
      type: "String",
      required: [true, "can't be blank"],
    },
    phone: {
      type: "String",
      required: [true, "can't be blank"],
    },
    imgUrl: {
      type: "String",
      required: [true, "can't be blank"],
    },
    categories: {
      type: Array,
      default: [],
    },

    info: {
      type: "String",
      required: [true, "can't be blank"],
      minLength: [10, "info be at least 10 letters, got {VALUE}"],
    },
    admin_short_id: String,
    status: {
      type: String,
      default: "pending",
    },
    date_created: {
      type: String,
      default: getFromattedDate(),
    },
    short_id: String,
    //   categories: Array,
  },
  { minimize: false } //not droping empty objects
);

exports.StoreModel = mongoose.model("stores", storeSchema);
