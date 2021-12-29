"use strict";

require("dotenv").config();
const express = require("express");
const cors = require("cors");

const mongooseConnect = require("./config/mongoose");
const errHandler = require("./middlewares/errHandler");
const picRouter = require("./routes/PicRouter");
const stakeholderRouter = require("./routes/StakeholderRouter");
const topicRouter = require("./routes/TopicRouter");

const server = express();
const PORT = process.env.PORT || 3000;

// Body parser
server.use(express.json());
server.use(express.urlencoded({extended: false}));

// Cors
server.use(cors());

mongooseConnect();

// Pic Routes
server.use("/pic", picRouter);
// Stakeholder Routes
server.use("/stakeholder", stakeholderRouter);
// Topic Routes
server.use("/topic", topicRouter);

// Error handler
server.use(errHandler);

server.listen(PORT, () => {
  console.log(`forhar app server is listening at http://localhost:${process.env.PORT}`);
});