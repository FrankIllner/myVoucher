const express = require("express");
var https = require('https');
var fs = require('fs');
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");

const app = express();

// https
var options = {
  key: fs.readFileSync('./cert/localhost+4-key.pem'),
  cert: fs.readFileSync('./cert/localhost+4.pem'),
};

//configure database and mongoose
mongoose
  .connect(config.database, { useNewUrlParser: true})
  .then(() => {
    console.log("Database is connected");
  })
  .catch(err => {
    console.log({ database_error: err });
  });

//registering cors
app.use(cors());

//configure body parser
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(morgan("dev")); // configire morgan

// define first route
app.get("/", (req, res) => {
  console.log("route success - HUHUHUHU");
});

 // alles zu Users 
const userRoutes = require("./api/route/user.js");
app.use("/user", userRoutes);

// alle Routes zu Gutscheine
const voucherRoutes = require("./api/route/voucher.js");
app.use("/voucher", voucherRoutes);

var server = https.createServer(options, app);
server.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
