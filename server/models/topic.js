"use strict";

const mongoose = require("mongoose");

const topic = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  topic_id: String,
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
  initiator: {
    id: String,
    acronym: String
  },
  related_satker: [{
    id: String,
    acronym: String
  }],
  related_dirjen: [{
    id: String,
    acronym: String
  }],
  pic_bi: [{
    id: String,
    full_name: String,
    phone_number: String
  }],
  pic_kemenkeu: [{
    id: String,
    full_name: String,
    phone_number: String
  }],
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
  edited_by: [],
  removed_by: [],
  destroyed_by: []
});

const model = mongoose.model("Topic", topic);

module.exports = model;