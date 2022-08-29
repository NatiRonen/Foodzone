const express = require("express");
const { random } = require("lodash");
const { authAdmin, authStoreAdmin } = require("../middlewares/auth");
const { genShortId } = require("../utils/genShortId");
const { ProductModel } = require("../models/productModel");
const { StoreModel } = require("../models/storeModel");
const router = express.Router();

//?cat=
router.get("/", async (req, res) => {
  let perPage = req.query.perPage || 5;
  let page = req.query.page >= 1 ? req.query.page - 1 : 0;
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  let cat = req.query.cat || null;
  try {
    // if find ?cat , do filter and get product of the category only
    // if not get all products
    objFind = cat ? { cat_short_id: cat } : {};

    let data = await ProductModel.find(objFind)
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: reverse });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
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
    let data = await ProductModel.find({
      $or: [{ name: searchReg }, { info: searchReg }],
    })
      .limit(perPage)
      .skip(page * perPage)
      .sort({ [sort]: reverse });
    // if(data=""){
    //   data = "not found"
    // }
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/amount", async (req, res) => {
  try {
    let cat = req.query.cat || null;
    objFind = cat ? { cat_short_id: cat } : {};
    // countDocuments -> return just the amount of documents in the collections
    let data = await ProductModel.countDocuments(objFind);
    res.json({ amount: data });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// get all the Products that belong to the store
router.get("/storeProducts/:id", async (req, res) => {
  let sort = req.query.sort || "_id";
  let reverse = req.query.reverse == "yes" ? 1 : -1;
  let id = req.params.id;
  try {
    let data = await ProductModel.find({
      store_short_id: id,
    }).sort({ [sort]: reverse });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/single/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = await ProductModel.findOne({ _id: id });
    res.json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/:id", authStoreAdmin, async (req, res) => {
  try {
    let product = new ProductModel(req.body);
    product.store_short_id = req.params.id;
    product.short_id = await genShortId(ProductModel);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.put("/:idEdit", authStoreAdmin, async (req, res) => {
  try {
    let idEdit = req.params.idEdit;
    let data = await ProductModel.updateOne({ _id: idEdit }, req.body);
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.delete("/:idDel", authStoreAdmin, async (req, res) => {
  try {
    let idDel = req.params.idDel;
    let data = await ProductModel.deleteOne({ _id: idDel });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
