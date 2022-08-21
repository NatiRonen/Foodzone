const mongoose = require("mongoose");
const { isEmail } = require("validator");

UserSchema = new mongoose.Schema(
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
    password: {
      type: "String",
      required: [true, "can't be blank"],
      minLength: [4, "Password must be at least 4 characters ar em, got {VALUE}"],
    },
    role: {
      type: "String",
      default: "user",
    },
    picture: {
      type: "String",
      default: "https://pics.freeicons.io/uploads/icons/png/16671574911586787867-64.png",
    },
    newMessages: {
      type: "Object",
      default: {},
    },
    status: {
      type: "String",
      default: "offline",
    },
    favs_ar: {
      type: Array,
      default: [],
    },
    short_id: {
      type: String,
      default: "",
    },
    reset_code: {
      type: String,
      default: "",
    },
  },
  { minimize: false } //not droping empty objects
);

exports.UserModel = mongoose.model("Users", UserSchema);

exports.genToken = (_userId, _role) => {
  let token = jwt.sign({ _id: _userId, role: _role }, process.env.JWT_SECRET, {
    expiresIn: "600mins",
  });
  return token;
};
