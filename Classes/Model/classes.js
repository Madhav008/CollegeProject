//Schema
// 1.Section
// 2.Group
// 3.Time
// 4.Subject
// 5.Link(Optional)

var mongoose = require('mongoose')
var Schema = mongoose.Schema;
var classSchema= new mongoose.Schema({
    section: {
     
        type: String,
        unique: true,
        require: true
    },
    group:{
        type: String,
        required:true
    },
     time: {
         type: String,
         required:true,
     },
     date: {
        type: Date,
        required:true,
    },
     subject: {
        type: String,
        required:true,
    },
    subject: {
        type: String,
        required:true,
    },
    link: {
        type: String,
        required:false,
    },

})


module.exports = mongoose.model('class',classSchema)