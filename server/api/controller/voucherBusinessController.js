const VoucherBusiness = require("../model/VoucherBusiness");

// Business Gutschein - hier erstellen Geschäts Leute ihren Gutschein
// Todo QR Coder generieren
exports.addBusinessVoucher = async (req, res) => {
  try {
    let isVoucher = await VoucherBusiness.find({ name: req.body.name });
    if (isVoucher.length >= 1) {
      return res.status(409).json({
        message: "Sie haben einen Gutschein mit gleichem Namen!"
      });
    }
    const voucherbusiness = new VoucherBusiness({
      selectedCategory: req.body.selectedCategory,
      expiryDate: req.body.expiryDate,
      name: req.body.name,
      price: req.body.price,
    });
    let data = await voucherbusiness.save();
    res.status(201).json({ data });
  } catch (err) {
    console.log('voucherController - false')
    res.status(400).json({ err: err });
  }
};
