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
    console.log('Basket in Warenkorb - false')
    res.status(400).json({ err: err });
  }
 
}

// kaufe Gutschein - alle wichtigen Paramter speichern
// Gutschein in den Warnekorb
exports.buyVoucher = async (req, res) => {
  let user_id = req.body.user_id;
  let partner_id = req.body.partner_id;
  let offer_voucher_id = req.body.offer_voucher_id;
  let status = req.body.status;

  try {
    
    let dataBuyBasket = await Basket.buyVoucher(offer_voucher_id, partner_id, user_id, status);
    res.status(201).json({ dataBuyBasket });
  } catch (err) {
    console.log('Basket kaufen - false')
    res.status(400).json({ err: err });
  }
 
}

// gibt mir die Id alle gekauften Gutscheine des Kunden aus - noch nicht eingelöst
exports.getBoughtVouchersId = async (req, res) => {
  let user_id = req.body.user_id;
  let user_type = req.body.userType;
  console.log('test');
  try {
    let vouchers = await Basket.getVoucherId(user_id, user_type);
    res.status(201).json({ vouchers });
  } catch (err) {
    console.log('Gutscheine Verwaltung - false')
    res.status(400).json({ err: err });
  }
 
}

exports.getBoughtVouchersHistory = async (req, res) => {
  let user_id = req.body.user_id;
  try {
    
    let vouchersHistory = await Basket.getVoucherIdHistory(user_id);
    res.status(201).json({ vouchersHistory });
  } catch (err) {
    console.log('Gutscheine Verwaltung History- false')
    res.status(400).json({ err: err });
  }
}

exports.checkQrCode = async (req, res) => {
  let buyId = req.body.buyId;
  try {
    let checkBuyId = await Basket.checkId(buyId);
    res.status(201).json({ checkBuyId });
  } catch (err) {
    console.log('Gutscheine Id - false')
    res.status(400).json({ err: err });
  }
}