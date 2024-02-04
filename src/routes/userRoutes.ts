const express = require("express");
const router = express.Router();

import * as userController from "./../controllers/userController";

router.post("/register", userController.createUser);
router.post("/login", userController.createUser);

module.exports = router;            