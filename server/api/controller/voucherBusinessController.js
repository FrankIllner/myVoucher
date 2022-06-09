const VoucherBusiness = require("../model/VoucherBusiness");
const Basket = require("../model/Basket");

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

    res.status(201).json({ dataVouchers });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// Gutschein in den Warnekorb
exports.addItemToBasket = async (req, res) => {
  let voucher_id = req.body.voucher_id;

  try {
    let dataBasket = await Basket.getVoucher(voucher_id);
    res.status(201).json({ dataBasket });
  } catch (err) {
    console.log('Basket - false')
    res.status(400).json({ err: err });
  }
 
}
