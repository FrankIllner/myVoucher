const express = require("express");
const router = express.Router();
const auth = require("../../config/auth");
const userController = require("../controller/userController");
const userBusinessController = require("../controller/userBusinessController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/registerBusiness", auth, userBusinessController.registerBusinessAdditional);
router.get("/me", auth, userController.getUserDetails);


module.exports = router;
