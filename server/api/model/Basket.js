const VoucherBusiness = require("../model/VoucherBusiness");
const mongoose = require("mongoose");
const basketSchema = new mongoose.Schema({
  userId: {
    type: String
  },
  offer_voucher_id: {
    type: String
  },
  partnerId: {
    type: String
  },
  status: {
    type: Boolean
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
// die gekauften Gutschein abspeichern - mit den wichtigen Paramtern
basketSchema.statics.buyVoucher = async (offer_voucher_id, partner_id, user_id, status) => {
  const buyVouchers = await Basket.create({"offer_voucher_id": offer_voucher_id,"userId": user_id, "partnerId": partner_id, "status": status});
  if (!buyVouchers) {
    throw new Error({ error: "Fehler bei Gutschein kauf" });
  }
 
  return buyVouchers;
};

// alle Gutscheine die gekauften wurden sind und noch nicht eingelöst sind
basketSchema.statics.getVoucherId = async (user_id, user_type) => {
  let vocherIdsNoBuy = [];
  console.log('#####11#######');
  if (user_type === 'registerBusiness') {
    buyVouchersId = await Basket.find({"partnerId": user_id});
  } else {
    buyVouchersId = await Basket.find({"userId": user_id});
  }
  
  buyVouchersId.forEach((value, index) => {
    console.log(index);
    console.log(value);
    if (value.status === false) {
      vocherIdsNoBuy.push(value.offer_voucher_id)
    }
  });
  console.log(vocherIdsNoBuy);
  const buyVouchers = await VoucherBusiness.find({ _id: { $in: vocherIdsNoBuy } })
  if (!buyVouchers) {
    throw new Error({ error: "Fehler bei auslesen Gutschein-Id Status-0" });
  }
 
  return buyVouchers;
};

// alle schon eingelösten Gutscheine
basketSchema.statics.getVoucherIdHistory = async (user_id) => {

  let vocherIdsBuy = [];
  const buyVouchersId = await Basket.find({"partnerId": user_id});
  buyVouchersId.forEach((value, index) => {
    console.log(index);
    if (value.status === true) {
      vocherIdsBuy.push(value.offer_voucher_id)
    }
  });

  const buyVouchersHistory = await VoucherBusiness.find({ _id: { $in: vocherIdsBuy } })
  if (!buyVouchersHistory) {
    throw new Error({ error: "Fehler bei auslesen Gutschein-Id Status-1" });
  }
  return buyVouchersHistory;
};

// pruefen auf BuyId - gibt es die, dann wird sie auf gekauft gesetzt
basketSchema.statics.checkId = async (buyId) => {
  let checkAndUpdateVoucher = await Basket.findByIdAndUpdate(buyId, {status: true});
  if (!checkAndUpdateVoucher) {
    throw new Error({ error: "Fehler bei Gutschein kauf" });
  }
 
  return checkAndUpdateVoucher;
};




const Basket = mongoose.model("Basket", basketSchema);
module.exports = Basket;
