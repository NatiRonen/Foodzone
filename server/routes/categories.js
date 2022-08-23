const express = require("express");
const { StoreModel } = require("../models/storeModel");
const router = express.Router();

router.get("/:storeId", async (req, res) => {
  let storeId = req.params.storeId;
  try {
    let categories = await StoreModel.findOne({ _id: storeId }, { categories: 1, _id: 0 });
    res.json(categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.patch("add_remove/:storeId/:catName", async (req, res) => {
  let storeId = req.params.storeId;
  let catName = req.params.catName;
  try {
    let categories = await StoreModel.up({ _id: storeId }, { categories: 1, _id: 0 });
    if (categories.includes(catName)) {
      categories = categories.filter((item) => item != catName);
    } else {
      categories.unshift(catName);
    }
    let data = await StoreModel.updateOne({ _id: storeId }, { categories: categories });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
