const express = require("express");
const router = express.Router();

import * as deviceController from "./../controllers/deviceController";

router.post("/add", deviceController.addDevice);

module.exports = router;