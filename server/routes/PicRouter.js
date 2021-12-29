"use strict";

const picRouter = require("express").Router();

const authentication = require("../middlewares/auth");
const PicController = require("../controllers/PicController");

picRouter.post("/picLogin", PicController.picLogin);
picRouter.post("/addPic", authentication, PicController.addPic);
picRouter.get("/picList", authentication, PicController.picList);
picRouter.get("/picDetail", authentication, PicController.picDetail);
picRouter.put("/editPic", authentication, PicController.editPic);
picRouter.delete("/removePic", authentication, PicController.removePic);

module.exports = picRouter;