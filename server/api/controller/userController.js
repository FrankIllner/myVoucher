const User = require("../model/User");
// @desc Register new User
// @route POST /register
// @access Public
exports.registerNewUser = async (req, res) => {
  try {
    let isUser = await User.find({ email: req.body.email });
    if (isUser.length >= 1 ) {
      return res.status(409).json({
        message: "email already in use"
      });
    }
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      usertype: req.body.usertype,
      userstatus: req.body.userstatus,
    });
    let data = await user.save();
    const token = await user.generateAuthToken(); // here it is calling the method that we created in the model
    res.status(201).json({ data, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// @desc Login
// @route POST /login
// @access Public
exports.loginUser = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findByCredentials(email, password);
 
    if (!user) {
      return res
        .status(401)
        .json({ error: "Login failed! Check authentication credentials" });
    }
    const token = await user.generateAuthToken();
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// @desc Login
// @route POST /me
// @access Private
exports.getUserDetails = async (req, res) => {
  await res.json(req.userData);
};


// gibt die aktuelle AdditionalId zurück
exports.getAdditionalById = async (req, res) => {
  let userId = req.userData._id;
  try {
    let o_additional = await User.findAdditonalId(userId);
    res.status(201).json({ o_additional });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};


// prueft ob Account freigeschaltet ist
exports.getUserStatus = async (req, res) => {
  let userId = req.userData._id;
  try {
    let isActive = await User.checkUserStatus(userId);
    res.status(201).json({ isActive });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};




