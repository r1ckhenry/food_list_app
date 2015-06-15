// REQUIREMENTS //
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
 
// CONFIG //
 
// serve js & css files into a public folder
app.use(express.static(__dirname + '/public'));
 
// body parser config
app.use(bodyParser.urlencoded({ extended: true }));
 
// DATA //
 
// pre-seeded food data
var foods =[
  {id: 0, name: "Sushiritto", yumminess: "quite"},
  {id: 1, name: "Green Eggs & Ham", yumminess: "sure"},
  {id: 2, name: "Crayfish", yumminess: "depending"},
  {id: 3, name: "Foie Gras", yumminess: "omg"},
  {id: 4, name: "Kale", yumminess: "meh"}
];
 
// ROUTES //
 
// root path
app.get("/", function (req, res){
  // render index.html
  res.sendFile(path.join(__dirname + '/public/views/index.html'));
});
 
// foods index path
app.get("/foods", function (req, res){
  // render foods index as JSON
  res.send(foods);
});
 
app.post("/foods", function (req, res){
  var newFood = req.body;
  //add a unique id
  newFood['food'].id = foods[foods.length - 1].id + 1;
  // add new food to DB (array, really...)
  foods.push(newFood['food']);
  // send a response with newly created object
  res.send(newFood['food']);
});
 
app.delete("/foods/:id", function (req, res){
  // finding an object with id = req.body.id out of the foods
  // remove item from array
  foods.splice(req.body.id, req.body.id);
  // render deleted object
  res.send(foods);
});
 
// listen on port 3000
app.listen(3000, function (){
  console.log("listening on port 3000");
});