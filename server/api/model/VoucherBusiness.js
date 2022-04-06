const mongoose = require("mongoose");
const voucherBusinessSchema = mongoose.Schema({
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
  expiryDate: {
    type: String
  },
  userId: {
    type: String
  }
});

voucherBusinessSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  next();
});


// die Methode schaut, ob es einen Gutschein mit gleichem Namen schon gibt.
voucherBusinessSchema.statics.findByCredentials = async (name) => {
  const VoucherBusiness = await VoucherBusiness.findOne({ name });
  if (!VoucherBusiness) {
    throw new Error({ error: "kein Gutschein gefunden - mit diesem Namen" });
  }
 
  return VoucherBusiness;
};

const VoucherBusiness = mongoose.model("VoucherBusiness", voucherBusinessSchema);
module.exports = VoucherBusiness;
