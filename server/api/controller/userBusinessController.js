const UserBusiness = require("../model/UserBusiness");
const User = require("../model/User");

// @desc Register new User
// @route POST /register
// @access Public
exports.registerBusinessAdditional = async (req, res) => {
  try {
    let isBusinessNo = await UserBusiness.find({ businessNo: req.body.businessNo });
    if (isBusinessNo.length >= 1) {
      return res.status(409).json({
        message: "Es exestiert schon ein Gewerbe mit der ID - already in use"
      });
    }
   
    const userbusiness = new UserBusiness({
      company: req.body.company,
      street: req.body.street,
      streetNo: req.body.streetNo,
      postcode: req.body.postcode,
      city: req.body.city,
      phone: req.body.phone,
      businessNo: req.body.businessNo
    });
    let data = await userbusiness.save();
   
    let additionalId = userbusiness._id;
    console.log(additionalId);
    let id = req.body.userId;
    console.log(id);
    let UserObject = await User.findByIdAndUpdate(id, {additionalId: additionalId});
    console.log(UserObject);
 
    res.status(201).json({ data });
  
  } catch (err) {
    res.status(400).json({ err: err });
  }
};