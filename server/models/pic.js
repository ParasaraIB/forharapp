"use strict";

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const pic = new mongoose.Schema({
  created_at: {
    type: Date,
    default: Date.now
  },
  pic_id: String,
  full_name: String,
  username: String,
  email: String,
  institution: String,
  satker_dirjen: {
    id: String,
    acronym: String
  },
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
    export_to_csv: Boolean
  },
  pic_access: {
    view: Boolean,
    add: Boolean,
    edit: Boolean,
    remove: Boolean,
    print: Boolean
  },
  archive_access: {
    view: Boolean,
    move_to: Boolean,
    bulk_add: Boolean
  },
  trash_access: {
    view: Boolean,
    restore: Boolean,
    empty: Boolean
  },
  docs_access: {
    viewer: Boolean,
    commenter: Boolean,
    editor: Boolean
  },
  edited_by: [],
  removed_by: []
});

// Password
pic.methods.hashPassword = function(password) {
  this.salt = bcrypt.genSaltSync(10);
  this.hash = bcrypt.hashSync(password, this.salt);
}

pic.methods.validPassword = function(password) {
  const hash = bcrypt.hashSync(password, this.salt);
  return this.hash === hash;
}

// Password Reset
pic.methods.setPasswordResetCode = function(password) {
  this.password_reset_salt = bcrypt.genSalt(10);
  this.password_reset_hash = bcrypt.hashSync(password, this.password_reset_salt);
}

pic.methods.validPasswordResetCode = function(password) {
  const password_reset_hash = bcrypt.hashSync(password, this.salt);
  return this.hash === password_reset_hash;
}

pic.methods.generateJwt = function() {
  const expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);
  return jwt.sign({
    _id: this._id,
    pic_id: this.pic_id,
    username: this.username,
    email: this.email,
    exp: parseInt(expiry.getTime()/1000)
  }, process.env.FORHAR_SECRET);
}

const model = mongoose.model("Pic", pic);

module.exports = model;