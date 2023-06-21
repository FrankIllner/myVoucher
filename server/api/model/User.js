const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Include your name"]
  },
  email: {
    type: String,
    required: [true, "Please Include your email"]
  },
  password: {
    type: String,
    required: [true, "Please Include your password"]
  },
  usertype: {
    type: String
  },
  userstatus: {
    type: Boolean
  },
  additionalId: {
    type: mongoose.Schema.Types.ObjectId
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
});

userSchema.pre("save", async function(next) {
  // Hash the password before saving the user model
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//this function generates an auth token for the user
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const token = jwt.sign(
    { _id: user._id, name: user.name, email: user.email, usertype: user.usertype, userstatus: user.userstatus, additionalId: user.additionalId},
    "secret"
  );
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

// Login
// this method search for a user by email and password.
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login details" });
  }
  const isPasswordMatch = await bcrypt.compare(password, user.password);
  if (!isPasswordMatch) {
    throw new Error({ error: "Invalid login details" });
  }
  return user;
};


// gibt den aktuellen User zurück
userSchema.statics.findAdditonalId = async (id) => {
  const o_user = await User.find({_id: id});
  if (!o_user) {
    throw new Error({ error: "keine Unternhemen gefunden" });
  }
  return o_user;
};

// prueft den aktuellen User, ob der Account freigeschlatet ist
userSchema.statics.checkUserStatus = async (id) => {
  const o_user = await User.findOne({_id: id});
             
  if (!o_user) {
    throw new Error({ error: "User Id nicht gefunden" });
  }
  return o_user.userstatus;
};

// setzt userstatus auf true
userSchema.statics.activatedUser = async (id) => {
  const userActivated = await User.findByIdAndUpdate(id, {userstatus: true});
             
  if (!userActivated) {
    throw new Error({ error: "User konnte nicht freigeschaktet werden" });
  }
  return true;
};



const User = mongoose.model("User", userSchema);
module.exports = User;

