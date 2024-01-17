const mongoose = require("mongoose");
const Container = require("../models/containerModel");

const getContainer = async (req, res, next) => {
  try {
    const containerId = req.params.id;
    console.log(containerId);

    const result = await Container.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(containerId),
        },
      },
      {
        $project: {
          _id: 0,
          noOfOrders: { $size: "$mainOrderIds" },
          containerInfo: {
            size: "$size",
            containerName: "$containerName",
            containerSN: "$containerNumber",
          },
        },
      },
    ]);

    res.status(200).json(result);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = getContainer;
