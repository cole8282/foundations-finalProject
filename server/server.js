const express = require('express');
const cors = require("cors");
const controller = require("./controller.js");

const app = express();

app.use(express.json());
app.use(cors());




//usernames and passwords array
let usernames = [];
let passwords = [];
//register usernames
app.post("/register/users", function(req, res) {
  usernames.push(req.body.username);
  passwords.push(req.body.password);
  res.status(200).send("succesfull");
  // res.status(200).send(passwords);
})

//log in usernames and passwords
app.post("/logIn/users", function(req, res) {
  let usernamesMatch;
  let passwordsMatch;

  usernamesMatch = controller.iterator(usernames, req.body.username);
  passwordsMatch = controller.iterator(passwords, req.body.password);

  if (passwordsMatch && usernamesMatch) {
    res.status(200).send("User Found");
  } else {
    res.status(200).send("User Not Found");
  }
})



app.listen(4050, function() {
  console.log("Server running on 4050");
});