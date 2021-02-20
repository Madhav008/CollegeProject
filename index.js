var express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");


const Update= require("./Classes/Model/update");
const userRoute = require("./Classes/Routes/users");
const classRoute = require("./Classes/Routes/classes");
const automateNotification = require("./oneSignal/automate");
const suggestion = require("./Classes/Routes/suggetion");

const connectDB = require("./config/db");

require("./auth/google")(passport);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/suggestion", suggestion);
app.use("/notification", automateNotification);
app.use("/timetable", classRoute);
app.use("/user", userRoute);

app.use(passport.initialize());


app.get("/update",async function(req,res){
   await res.send(Update.find()); 
})

app.post("/update",async function(req,res){

  new Update().save();
  res.send("done")
})

app.get("/google", passport.authenticate("google", { scope: ["profile"] }));

app.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/google" }),
  (req, res) => {
    res.redirect("/dashboard");
  }
);

connectDB();

app.listen(process.env.PORT || 4000, function () {
  console.log("Server Started .....");
});
