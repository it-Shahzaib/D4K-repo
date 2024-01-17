const express = require("express");
const router = express.Router();

const getContainerController = require("../controllers/containerController");

router.get("/:id", getContainerController);

module.exports = router;
