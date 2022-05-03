const VoucherBusiness = require("../model/VoucherBusiness");

// Business Gutschein - hier erstellen Geschäts Leute ihren Gutschein
// Todo QR Coder generieren
exports.addBusinessVoucher = async (req, res) => {
  try {

    const voucherbusiness = new VoucherBusiness({
      selectedCategory: req.body.selectedCategory,
      expiryDate: req.body.expiryDate,
      name: req.body.name,
      price: req.body.price,
      userId: req.body.userId
    });
    let data = await voucherbusiness.save();
    res.status(201).json({ data });
  } catch (err) {
    console.log('voucherController - false')
    res.status(400).json({ err: err });
  }
};
// Voucher auselen
exports.getVoucher = async (req, res) => {
  let current_id =  req.body.userid;
  try {
    let dataVouchers = await VoucherBusiness.findVouchers(current_id);
    console.log(dataVouchers);
    res.status(201).json({ dataVouchers });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};
