const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

const app = express();

//configure database and mongoose
mongoose
  .connect(config.database, { useNewUrlParser: true})
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });
// db configuaration ends here


//registering cors
app.use(cors());
//configure body parser
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
//configure body-parser ends here

app.use(morgan("dev")); // configire morgan

// define first route
app.get("/", (req, res) => {
  console.log("route success - HUHUHUHU");
});

 // alles zu Users 
const userRoutes = require("./api/route/user.js");
app.use("/user", userRoutes);

// alle Routes zu Gutscheine
const voucherRoutes = require("./api/route/voucher.js"); //bring in our user routes
app.use("/voucher", voucherRoutes);


app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
