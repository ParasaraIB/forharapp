"use strict";

const mongoose = require("mongoose");

const counter = new mongoose.Schema({
  type: String,
  yearMonth: String,
  count: Number
});

const model = mongoose.model("Counter", counter);

module.exports = model;