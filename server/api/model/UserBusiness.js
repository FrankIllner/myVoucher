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
  businessNo: {
    type: String,
    required: [true, "Please Include your businessNo"]
  },
  userId: {
    type: String
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


const UserBusiness = mongoose.model("UserBusiness", userBusinessSchema);
module.exports = UserBusiness;
