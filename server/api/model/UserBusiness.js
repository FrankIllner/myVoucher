const mongoose = require("mongoose");

const userBusinessSchema = mongoose.Schema({
  company: {
    type: String,
    required: [true, "Please Include your name"]
  },
  street: {
    type: String,
    required: [true, "Please Include your Street"]
  },
  streetNo: {
    type: String,
    required: [true, "Please Include your streetNo"]
  },
  postcode: {
    type: String,
    required: [true, "Please Include your postcode"]
  },
  city: {
    type: String,
    required: [true, "Please Include your city"]
  },
  phone: {
    type: String,
    required: [true, "Please Include your Phone"]
  },
  opening: {
    type: String,
  },
  businessNo: {
    type: String,
    required: [true, "Please Include your businessNo"]
  },
  userId: {
    type: String
  },
  aboutus: {
    type: String,
  },
  file1: {
    type: Array
  },

});


userBusinessSchema.pre("save", async function(next) {
  console.log('userBusiness');
  const userBusiness = this;

  console.log(userBusiness);
  // Hash the password before saving the user model
  next();
});

// die Methode schaut, ob es einen businnes mit gleichem No schon gibt.
userBusinessSchema.statics.findByCredentials = async (businessNo) => {
  const userBusiness = await UserBusiness.findOne({ businessNo });
  if (!userBusiness) {
    throw new Error({ error: "Company exestiet schon!" });
  }
 
  return userBusiness;
};

// die Methode gibt alle Companies zurück
userBusinessSchema.statics.findAllBusiness = async () => {
  const allBusinessPartner = await UserBusiness.find();
  if (!allBusinessPartner) {
    throw new Error({ error: "keine Unternhemen gefunden" });
  }
 
  return allBusinessPartner;
};

// die Methode gibt eine Company zurück
userBusinessSchema.statics.findOneCompany = async (id) => {

  const companyInfos = await UserBusiness.find({_id: id});
  if (!companyInfos) {
    throw new Error({ error: "keine Unternhemen gefunden" });
  }
  return companyInfos;
};

// pruefen ob Zusatzinfos hinterlegt sind 
userBusinessSchema.statics.findAdditonalInfo = async (id) => {

  const hasCompanyInfos = await UserBusiness.find({_id: id});
  console.log('hasCompanyInfos');
  console.log(hasCompanyInfos);
  if (hasCompanyInfos.length === 1) {
    return true;    
  }
  return false;
};



const UserBusiness = mongoose.model("UserBusiness", userBusinessSchema);
module.exports = UserBusiness;
