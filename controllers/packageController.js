const Package = require("../models/packageModel");

const getPackages = async (req, res, next) => {
  try {
    const { shortBarcode, barcode } = req.body;

    const result = await Package.aggregate([
      {
        $match: {
          $or: [{ shortBarcode: shortBarcode }, { barcode: barcode }],
        },
      },
      {
        $lookup: {
          from: "orders",
          localField: "orderNumber",
          foreignField: "orderNumber",
          as: "orderInfo",
        },
      },
      {
        $unwind: {
          path: "$orderInfo",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          packageInfo: {
            orderNumber: "$orderNumber",
            positionNumber: "$positionNumber",
            item: "$item",
            packageName: "$packageName",
          },
          orderInfo: {
            orderName: "$orderInfo.orderName",
            stagingArea: "$packageInfo.stagingArea",
            totalVolume: "$orderInfo.totalVolume",
            totalWeight: "$orderInfo.totalWeight",
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
};

module.exports = getPackages;
