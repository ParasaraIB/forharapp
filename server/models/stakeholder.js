"use strict";

const mongoose = require("mongoose")

const stakeholder = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  name: String,
  acronym: String,
  institution: String,
  removed: {
    type: Boolean,
    default: false
  },
  edited_by: [],
  removed_by: []
});

const model = mongoose.model("Stakeholder", stakeholder);

module.exports = model;