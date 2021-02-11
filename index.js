var express = require("express");
const bodyParser = require('body-parser');

const passport = require("passport");
const User = require("./Classes/Model/user");
const mongoose = require("mongoose");

require("./auth/google")(passport);
const app = express();

const conn = mongoose.connect("mongodb://127.0.0.1:27017/college_classes", {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


app.get("/dashboard", function (req, res) {
  res.send("Hello");
  console.log("hello");
});

app.put("/user:userId", async function (req, res) {
  console.log(req.body.university);

  User.findByIdAndUpdate(req.params.userId, {
    
  }).then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.userId,
      });
    }
    res.send(data);
  });
});

app.use(passport.initialize());

app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

app.listen(process.env.PORT || 4000, function () {
  console.log("Server Started .....");
});
