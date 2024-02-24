const express = require("express");
const routes = express.Router();
const channelCtrl = require("../controllers/channel");


routes.get("/:id", channelCtrl.getLiveById);
routes.get("/",  channelCtrl.getAllLives);
routes.post("/",channelCtrl.createNewLive)

module.exports = routes;