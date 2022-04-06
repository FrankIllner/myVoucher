const mongoose = require("mongoose");
const voucherSchema = mongoose.Schema({
  selectedCategory: {
    type: String,
  },
  name: {
    type: String,
    required: [true, "Bitte den Gutscheinname eintragen"]
  },
  price: {
    type: String,
    required: [true, "Bitte geben Sie den Betrag ein"]
  },
  fromPerson: {
    type: String
  },
  expiryDate: {
    type: String
  },
  file1: {
    type: Array
  },
  userId: {
    type: String
  }
});

voucherSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  next();
});


// die Methode schaut, ob es einen Gutschein mit gleichem Namen schon gibt.
voucherSchema.statics.findByCredentials = async (name) => {
  const voucher = await Voucher.findOne({ name });
  if (!voucher) {
    throw new Error({ error: "kein Gutschein gefunden - mit diesem Namen" });
  }
 
  return voucher;
};

const Voucher = mongoose.model("Voucher", voucherSchema);
module.exports = Voucher;
