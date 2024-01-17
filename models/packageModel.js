const mongoose = require("mongoose");

const Schema = new mongoose.Schema({});

const Package = mongoose.model("Package", Schema);

module.exports = Package;
