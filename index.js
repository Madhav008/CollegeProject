var express = require("express");
const bodyParser = require("body-parser");

const passport = require("passport");
const User = require("./Classes/Model/user");
const Classes = require("./Classes/Model/classes");
const mongoose = require("mongoose");

require("./auth/google")(passport);
const app = express();

const conn = mongoose.connect("mongodb://127.0.0.1:27017/college_classes", {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

app.get("/dashboard", function (req, res) {
  res.send("Hello");
  console.log("hello");
});

app.put("/user:userId", async function (req, res) {
  User.findByIdAndUpdate(req.params.userId, {
    $set: req.body,
  }).then((data) => {
    if (!data) {
      return res.status(404).send({
        message: "Note not found with id " + req.params.userId,
      });
    }
    res.send(data);
  });
});

app.get("/timeTable/section:section", async function (req, res) {
  console.log(req.params.section  )
  var timetable = await Classes.find({section:req.params.section});

  res.send(timetable);
});

app.delete("/timeTable/id:id", async function (req, res) {
  var timetable = await Classes.findOne(req.params.id);

  if (timetable != null) {
    timetable.deleteOne();
    res.send({ message: "success" });
  }
});

app.post("/timeTable", function (req, res) {
  
  const timetable = new Classes({
    section: req.body.section,
    group: req.body.group,
    time: req.body.time,
    date: req.body.date,
    subject: req.body.subject,
    link: req.body.link,
  });
  console.log(timetable);
  timetable.save();

  res.json(timetable);
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
