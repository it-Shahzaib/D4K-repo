const express = require("express");
const router = express.Router();

const getPackagesController = require("../controllers/packageController");

router.post("/", getPackagesController);

module.exports = router;
