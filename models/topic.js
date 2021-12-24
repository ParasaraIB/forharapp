"use strict";

const mongoose = require("mongoose");

const topic = new mongoose.Schema({
  created_at: Date,
  title: String,
  status: String,
  category: String,
  start_date: Date,
  end_date: Date,
  reminders: [{
    reminder_date: Date,
    message: String
  }],
  progresses: [{
    percentage: Number,
    description: String
  }],
  initiator: String,
  importance: String,
  agreement: String,
  removed: {
    type: Boolean,
    default: false 
  },
  docs_link: String,
  destroyed: {
    type: Boolean,
    default: false
  },
  archived: {
    type: Boolean,
    default: false
  },
  outputs: [{
    description: String,
    file_link: String
  }],
  edited_by: []
});

const model = mongoose.model("Topic", topic);

module.exports = model;