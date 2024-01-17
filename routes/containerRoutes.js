const express = require("express");
const router = express.Router();

const {
  getContainer,
  getOrderPackagesCount,
} = require("../controllers/containerController");

router.get("/:id", getContainer);

router.get("/packagesCount/:id", getOrderPackagesCount);

module.exports = router;
