const Voucher = require("../model/Voucher");

// Gutschein für private User - speichern ihren eigenen Gutschein
// TODO: File auslesen
exports.addvoucher = async (req, res) => {
  try {

    let isVoucher = await Voucher.find({ name: req.body.name });
   
    if (isVoucher.length >= 1) {
      return res.status(409).json({
        message: "Du hast einen Gutschein mit gleichem Namen!"
      });
    }
    const voucher = new Voucher({
      selectedCategory: req.body.selectedCategory,
      expiryDate: req.body.expiryDate,
      name: req.body.name,
      price: req.body.price,
      fromPerson: req.body.fromPerson,
      file1: req.body.file1,
      userId: req.body.userId

    });
    let data = await voucher.save();

    res.status(201).json({ data });
  } catch (err) {
    console.log('vocuherController - false')
    res.status(400).json({ err: err });
  }
};
