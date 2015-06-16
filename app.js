// Get the node.js extra code that lets us concatenate paths
var path = require('path');

// Get the npm package Express -- our web server 
// (and some helpful stuff to help parse data from non-GET requests)
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer'); 

// Get the npm package Underscore -- y'all know what this does
var u = require("underscore")

// Create a new Express application
var app = express();

// Use that "helpful stuff" to parse POST requests into request.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());


// Serves up any specifically-requested static files out of the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Route to serve the "index.html" file out of the public folder
app.get("/", function(req, res){
  // Use response.sendFile method to send a specific file
  res.sendFile("public/index.html")
})

// Route to list all available remedies
app.get("/remedy", function(req, res){
  // Send back all remedies, bereft of description and reaction text
  res.json({ remedies: u.omit(remedies, "description", "reactions") })
})

// Route to list a specific remedy by id (/remedy/6 or whatever)
app.get("/remedy/:id", function(req, res){
  // Find the specific remedy in the list and send it back
  res.json(u.find(remedies, function(r){
    return r.id === parseInt(req.params.id)
  }))
})

// Route to create a new remedy
app.put("/remedy", function(req, res){
  // Increment the id counter
  idCounter++
  
  // Create a new object with the id and passed-in data
  var newItem = {
    id: idCounter,
    name: req.body.name,
    prevention: req.body.prevention,
    treatment: req.body.treatment,
    description: req.body.description,
    reactions: req.body.reactions
  }
  
  // Push it into the remedy list
  remedies.push(newItem)

  // Send it back, with id
  res.json(newItem)
})

// Get the seed remedies (in remedies.js)
var remedies = require("./remedies")
// Establish a primary key counter
var idCounter = remedies.length

module.exports = app;
