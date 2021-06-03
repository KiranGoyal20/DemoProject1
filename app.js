var express = require("express");
var bodyParser = require("body-parser");

//mongoose file for connection
let mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/mydbValidation", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("connection successful"))
  .catch(err => console.log("connection failed"));

let UserModel = require("./models/myuser");

var app = express();

app.use(bodyParser.json());
app.use(express.static("public"));

app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.get("/", function (req, res) {
  res.sendfile("index.html");
});

app.get("/signup.html", function (req, res) {
  res.sendfile("signup.html");
});

app.post("/sign_up", function (req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var pass = req.body.password;
  var phone = req.body.phone;

  let model = new UserModel({
    name: name,
    email: email,
    password: pass,
    phone: phone
  });

  model
    .save()
    .then(doc => {
      console.log(doc);
      console.log("Record inserted Successfully");
      return res.redirect("signup_success.html");
    })
    .catch(err => {
      console.error(err);
      return res.redirect("failed.html");
    });
});

app.post("/sign_in", function (req, res) {
  var name = req.body.name;
  var pass = req.body.password;

  UserModel.findOne({ name: name, password: pass }, function (err, user) {
    if (err) {
      console.log(err);
      return res.redirect("failed.html");
    }
    if (!user) {
      console.log(user);
      return res.redirect("failed.html");
    }
    return res.redirect("signin_success.html");
  });
  /*
    let model = new UserModel()
    model.find({name:name})
    .then(doc => {
     console.log(doc);
     console.log("Record found Successfully"); 
     return res.redirect('signin_success.html');
   })
   .catch(err => {
     console.error(err);
     return res.redirect('failed.html');
   })
   */
});

app.listen("3000", () => {
  console.log("server is start");
  console.log("Listening at port 3000");
});
