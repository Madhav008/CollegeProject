// 1.name
// 2.university
// 3.Section
// 4.Group
// 5.admin(sub-admin)
// 6.profile pic(optional)

var mongoose = require("mongoose");

var User = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  googleId: {
    type: String,
    require: true,
  },
  university: {
    type: String,
  },
  group: {
    type: String,
  },
  section: {
    type: String,
  },
  type: {
    type: String,
    default: "user",
  },
  image: {
    type: String,
  },
  accessToken: {
    type: String,
  },
});

module.exports = mongoose.model("user", User);
