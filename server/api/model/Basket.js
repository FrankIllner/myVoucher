const VoucherBusiness = require("../model/VoucherBusiness");
const mongoose = require("mongoose");
const basketSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  voucherId: {
    type: String
  },
  piece: {
      type: Number
  }

});

// alle Gutschein speichern, die in den Warenkorb gelegt wurden sind
basketSchema.statics.getVoucher = async (voucher_id) => {
  const addVouchers = await VoucherBusiness.find({"_id": voucher_id});
  if (!addVouchers) {
    throw new Error({ error: "Fehler Warnkorb" });
  }
 
  return addVouchers;
};


const Basket = mongoose.model("Basket", basketSchema);
module.exports = Basket;
