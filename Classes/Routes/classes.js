//Routes of classes
const express = require("express");

const router = express.Router();

router.get("/section:section", async function (req, res) {
  console.log(req.params.section);
  var timetable = await Classes.find({ section: req.params.section });

  res.send(timetable);
});

router.delete("/id:id", async function (req, res) {
  var timetable = await Classes.findOne(req.params.id);

  if (timetable != null) {
    timetable.deleteOne();
    res.send({ message: "success" });
  }
});

router.post("/", function (req, res) {
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

module.exports = router;
