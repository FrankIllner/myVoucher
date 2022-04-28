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
      opening: req.body.opening,
      businessNo: req.body.businessNo,
      aboutus: req.body.aboutus,
      file1: req.body.file1
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
// alle Company Zusatinfos auslesen auslesen
exports.getAllBusinessUser = async (req, res) => {
  try {
    let data = await UserBusiness.findAllBusiness();
    res.status(201).json({ data });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// Company Daten  auselen
exports.getCompany = async (req, res) => {
  let currentAdditionalId = req.body.additionalId;
  try {
    let dataCompany = await UserBusiness.findOneCompany(currentAdditionalId);
    res.status(201).json({ dataCompany });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

// pruefen ob Zusatzinfos schon exestieren
exports.hasAdditinalInfos = async (req, res) => {
  let userId = req.userData._id;
  try {
    let o_additional = await User.findAdditonalId(userId);
    let additionalId = o_additional[0].additionalId;
    console.log('------------additionalId---------------');
    console.log(additionalId);
    let hasAdditional = await UserBusiness.findAdditonalInfo(additionalId);
   
    res.status(201).json({ hasAdditional });
  } catch (err) {
    res.status(400).json({ err: err });
  }
};

