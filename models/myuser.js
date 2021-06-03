let mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    name: { type:String,unique:true },
    email: { type:String },
    phone: { type:Number },
    password: { type:String}
})
 var User = mongoose.model('myuser',userSchema);
 module.exports = User;