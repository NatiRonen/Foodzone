const express = require("express");
const { auth, authStoreAdmin, authAdmin, authOwnership } = require("../middlewares/auth");
const { sendNewStoreEmail } = require("../utils/sendEmail");
const { genShortId } = require("../utils/genShortId");
const { StoreModel, validateStore } = require("../models/storeModel");
const { UserModel } = require("../models/userModel");
const router = express.Router();

//get all stores
router.get("/", async (req, res) => {
  let perPage = req.query.perPage || 99;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  let status = req.query.status;
  try {
    let filter = status ? { status } : {};
    // let data = await StoreModel.find({})
    let data = await StoreModel.find(filter)
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: reverse });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
router.get("/storeInfo/:short_id", authAdmin, async (req, res) => {
  try {
    let data = await StoreModel.findOne({ short_id: req.params.short_id });
    console.log(data);
    res.json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});
//test
// get user stores
router.get("/userStores", auth, async (req, res) => {
  try {
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    let data = await StoreModel.find({ admin_short_id: user.short_id }).sort({
      date_created: -1,
    });
    res.json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//?s=
router.get("/search", async (req, res) => {
  let perPage = req.query.perPage || 5;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? -1 : 1;
  let searchQ = req.query.s;
  try {
    // i -> cancel the case sensitve
    let searchReg = new RegExp(searchQ, "i");
    let data = await StoreModel.find({
      $or: [{ name: searchReg }, { info: searchReg }],
    })
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: reverse });

    // filter To get just the active stores
    let filterData = data.filter((store) => store.status === "active");
    res.json(filterData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//get single stores
router.get("/single/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await StoreModel.findOne({ short_id: id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get amount of stores
router.get("/amount", async (req, res) => {
  let status = req.query.status;
  let cat = req.query.cat || null;
  try {
    let filter = status ? { status } : {};
    // objFind = cat ? { cat_short_id: cat } : {};
    // countDocuments -> return just the amount of documents in the collections
    let data = await StoreModel.countDocuments(filter);
    res.json({ amount: data });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//open new Store
router.post("/", auth, async (req, res) => {
  try {
    let store = new StoreModel(req.body);
    let user = await UserModel.findOne({ _id: req.tokenData._id });
    store.admin_short_id = user.short_id;
    store.short_id = await genShortId(StoreModel);
    await store.save();
    res.status(201).json(store);
  } catch (err) {
    if (err.code == 11000) {
      return res.status(400).json({ ...err, message: "store name already taken" });
    }
    console.log(err);
    return res.status(500).json(err);
  }
});

//Edit  Store
router.put("/:idStore", authStoreAdmin, async (req, res) => {
  try {
    let idEdit = req.params.idStore;
    let data = await StoreModel.update({ _id: idEdit }, { ...req.body });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// change store status
router.patch("/updateStatus/:idStore", authAdmin, async (req, res) => {
  try {
    let idStore = req.params.idStore;
    let store = await StoreModel.findOne({ _id: idStore });
    let status = store.status === "pending" ? "active" : "pending";
    let data = await StoreModel.updateOne({ _id: idStore }, { status });
    data.status = status;
    //get user info for the email and update role
    let user = await UserModel.findOne({ short_id: store.admin_short_id });
    //update user's role to store admin
    if (status === "active" && user.role != "storeAdmin") {
      let data = await UserModel.updateOne({ _id: user._id }, { role: "storeAdmin" });
      console.log(data);
    } else {
      //check if the user own any other activate store
      let anyStore = await StoreModel.find({
        admin_id: user._id,
        status: "active",
      });
      if (anyStore.length === 0) {
        //no activated store left
        await UserModel.updateOne(user, { role: "user" });
      }
    }
    user.status = data.status;
    user.imgUrl = store.imgUrl;
    // send the store owner email that his store is active
    if (sendNewStoreEmail(user)) {
      return res.status(200).json({ data, msg: "New Store email sended", emailStatus: "ok" });
    } else {
      return res.status(200).json({ data, msg: "New Store email Not sended", emailStatus: "err" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

//Delete  Store
router.delete("/:idStore", authStoreAdmin, async (req, res) => {
  try {
    let idDel = req.params.idStore;
    let data = await StoreModel.deleteOne({ _id: idDel });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
