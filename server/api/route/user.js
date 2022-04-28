const express = require("express");
const router = express.Router();
const auth = require("../../config/auth");
const userController = require("../controller/userController");
const userBusinessController = require("../controller/userBusinessController");

router.post("/register", userController.registerNewUser);
router.post("/login", userController.loginUser);
router.post("/registerBusiness", auth, userBusinessController.registerBusinessAdditional);
router.get("/me", auth, userController.getUserDetails);
router.post("/checkAdditional", auth, userBusinessController.hasAdditinalInfos);
router.post("/getAllBusiness",auth, userBusinessController.getAllBusinessUser);
router.post("/findCompany", userBusinessController.getCompany);


module.exports = router;
