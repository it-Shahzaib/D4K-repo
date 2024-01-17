const mongoose = require("mongoose");

const Schema = new mongoose.Schema({});

const Container = mongoose.model("Container", Schema);

module.exports = Container;
