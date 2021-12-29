"use strict";

const topicRouter = require("express").Router();

const authentication = require("../middlewares/auth");
const TopicController = require("../controllers/TopicController");

topicRouter.post("/addTopic", authentication, TopicController.addTopic);
topicRouter.get("/topicList", authentication, TopicController.topicList);
topicRouter.get("/topicDetail", authentication, TopicController.topicDetail);
topicRouter.put("/editTopic", authentication, TopicController.editTopic);
topicRouter.delete("/removeTopic", authentication, TopicController.removeTopic);

module.exports = topicRouter;