const express = require("express");
const router = express.Router();
const auth = require("../../config/auth");
const voucherController = require("../controller/voucherController");
const voucherBusinessController = require("../controller/voucherBusinessController");

router.post("/addUsersVoucher",auth, voucherController.addvoucher);
router.post("/addBusinessVoucher",auth, voucherBusinessController.addBusinessVoucher);
router.post("/getAllVouchers",auth, voucherController.getAllVouchers);
router.post("/toBasket",auth, voucherBusinessController.addItemToBasket);
router.post("/buyVoucher",auth, voucherBusinessController.buyVoucher);
router.post("/findVouchers", voucherBusinessController.getVoucher);
router.post("/getAllBoughtVouchers", auth, voucherBusinessController.getBoughtVouchersId);
router.post("/getAllBoughtVouchersHistory", auth, voucherBusinessController.getBoughtVouchersHistory);


module.exports = router;
