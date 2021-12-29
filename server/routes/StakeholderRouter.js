"use strict";

const stakeholderRouter = require("express").Router();

const authentication = require("../middlewares/auth");
const StakeholderController = require("../controllers/StakeholderController");

stakeholderRouter.post("/addStakeholder", authentication, StakeholderController.addStakeholder);
stakeholderRouter.get("/stakeholderList", authentication, StakeholderController.stakeholderList);
stakeholderRouter.get("/stakeholderDetail", authentication, StakeholderController.stakeholderDetail);
stakeholderRouter.put("/editStakeholder", authentication, StakeholderController.editStakeholder);
stakeholderRouter.delete("/removeStakeholder", authentication, StakeholderController.removeStakeholder);
stakeholderRouter.get("/getStakeholders", authentication, StakeholderController.getStakeholders);

module.exports = stakeholderRouter;