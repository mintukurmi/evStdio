const express = require("express");
const router = express.Router();

// imports controllers
const userController = require("../controllers/user.controller");

router.post("/signup", userController.userSignup);
router.post("/signin", userController.userSignin);

module.exports = router;
