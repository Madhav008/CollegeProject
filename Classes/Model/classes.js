var mongoose = require("mongoose");

var classSchema = new mongoose.Schema({
  section: {
    type: String,
    require: true,
  },
  group: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },

  link: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("class", classSchema);
