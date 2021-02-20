var mongoose = require("mongoose");

var updateSchema = new mongoose.Schema({
  updateAvailabe: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("update", updateSchema);
