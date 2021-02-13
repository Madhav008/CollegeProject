
const express = require("express");
const router = express.Router();
const User = require("../Model/user");



router.put("/user:userId", async function (req, res) {
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

  module.exports = router;
  
  