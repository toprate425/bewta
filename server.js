const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const cors = require("cors");

require("dotenv").config();
const customers = require("./routes/api/customers");

const app = express();
// Bodyparser middleware
app.use(cors())
app.use(
  bodyParser.urlencoded({
    extended: false
  })    
);
app.use(bodyParser.json());
// DB Config
const DATABASE_CONNECTION = process.env.DATABASE_URL;
// Connect to MongoDB
mongoose
  .connect(
    DATABASE_CONNECTION,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));


// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/customers", customers);

const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));