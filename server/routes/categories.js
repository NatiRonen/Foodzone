const express = require("express");
const { StoreModel } = require("../models/storeModel");
const router = express.Router();

router.get("/:storeShortId", async (req, res) => {
  let storeShortId = req.params.storeShortId;
  try {
    let data = await StoreModel.findOne({ short_id: storeShortId }, { categories: 1, _id: 0 });
    res.json(data.categories);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
router.patch("/:storeShortId/:catName", async (req, res) => {
  let storeShortId = req.params.storeShortId;
  let catName = req.params.catName;
  try {
    let store = await StoreModel.findOne({ short_id: storeShortId }, { categories: 1, _id: 0 });
    let categories = store.categories;
    if (categories.includes(catName)) {
      categories = categories.filter((item) => item !== catName);
    } else {
      categories.unshift(catName);
    }
    let data = await StoreModel.updateOne({ short_id: storeShortId }, { categories: categories });
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
