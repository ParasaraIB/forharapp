"use strict";

const mongoose = require("mongoose")

const stakeholder = new mongoose.Schema({
  created_at: Date,
  name: String,
  acronym: String,
  institution: String,
  edited_by: []
});

const model = mongoose.model("Stakeholder", stakeholder);

module.exports = model;