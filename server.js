"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const {mongoConnect} = require("./config/mongo");

const server = express();
const PORT = process.env.PORT || 3000;

// Models
const Pic = require("./models/pic");

// Body parser
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// Cors
server.use(cors());

mongoConnect();

server.listen(PORT, () => {
  console.log("forhar app server is listening at http://localhost:3000");
});