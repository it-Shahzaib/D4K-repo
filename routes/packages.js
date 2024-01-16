const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Order = require("../models/orders");

router.post("/", async (req, res) => {
  try {
    const { shortBarcode, barcode } = req.body;

    const result = await Order.aggregate([
      {
        $lookup: {
          from: "packages",
          localField: "orderNumber",
          foreignField: "orderNumber",
          as: "packageInfo",
        },
      },
      {
        $unwind: "$packageInfo",
      },
      {
        $match: {
          $or: [
            { "packageInfo.shortBarcode": shortBarcode },
            { "packageInfo.barcode": barcode },
          ],
        },
      },
      {
        $project: {
          packageInfo: {
            orderNumber: "$packageInfo.orderNumber",
            positionNumber: "$packageInfo.positionNumber",
            item: "$packageInfo.item",
            packageName: "$packageInfo.packageName",
          },
          orderInfo: {
            orderNumber: "$orderNumber",
            orderName: "$orderName",
            stagingArea: "$packageInfo.stagingArea",
            totalVolume: "$totalVolume",
            totalWeight: "$totalWeight",
          },
          _id: 0,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
