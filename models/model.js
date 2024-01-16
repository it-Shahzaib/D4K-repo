const mongoose = require("mongoose");

const packageSchema = new mongoose.Schema({});

const Package = mongoose.model("Package", packageSchema);

module.exports = Package;
