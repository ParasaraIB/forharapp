"use strict";

const mongoose = require("mongoose");

const pic = new mongoose.Schema({
  created_at: Date,
  full_name: String,
  username: String,
  email: String,
  institution: String,
  satker_dirjen: String,
  salt: String,
  hash: String,
  phone_number: String,
  removed: {
    type: Boolean,
    default: false
  },
  super_user: Boolean,
  stakeholder_access: {
    view: Boolean,
    add: Boolean,
    edit: Boolean,
    remove: Boolean
  },
  topic_access: {
    view: Boolean,
    add: Boolean,
    edit: Boolean,
    remove: Boolean,
    bulk_add: Boolean,
    generate_report: Boolean,
    
  },

  edited_by: []
});

const model = mongoose.model("Pic", pic);

module.exports = model;