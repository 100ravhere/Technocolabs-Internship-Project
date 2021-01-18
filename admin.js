

//  Requiring Express, Mongodb, Mongoose, body-parser 
const express = require("express");
const app= express();
const mongoose = require("mongoose");
const bodyParser= require('body-parser'); 
const { Db } = require("mongodb");

app.use(bodyParser.urlencoded({extended: true}))


//  Connecting Mongodb
mongoose.connect('mongodb://localhost:27017/courses', {useNewUrlParser: true, useUnifiedTopology: true});


// Starting Server
app.listen(3000, function() {
    console.log('listening on 3000')
  });

// Listening on Home Page  
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/admin.html'); 
 });


// Creating Schema for Courses
 var courseSchema = new mongoose.Schema({
    title: String,
    image: String,
    price: Number
  });
  
 // Modelling the Schema 
  var Course = mongoose.model("Course",courseSchema);
 

// Taking the details from admin portal and Adding in Mongodb Database
 app.post('/courses', (req, res) => {
  
    const x = new Course({
      title : req.body["name"],
          image:req.body["image"],
          price : req.body["quote"]
    })
    x.save(function (err) {
      if (err) return handleError(err);
      // saved!
    
    });

    res.redirect("/");

    /*Course.create({
          title : req.body["name"],
          image:"X.jpg",
          price : req.body["quote"]
     });   
      res.sendFile(__dirname + '/admin.html');
      */ 
  });

// Taking Details of Course to be deleted and deleting it from the server
app.post('/cours',(req,res)=>{
  Course.deleteOne({ title: req.body["name"] }, function (err) {
    if (err) return handleError(err);
    // deleted at most one tank document
    
  });

  res.redirect("/");
})

// Editing a Course 
app.post('/cou',(req,res)=>{
  console.log(req.body["name"])
  var x= req.body["property"]
  var y=req.body["updated"]
  console.log(x);
  console.log(y);
  
  if (x=="price"){
    Course.findOneAndUpdate({title:req.body["name"]},{$set:{ price:y}},{new:true},(err,doc)=>{
      if (err){
        console.log(err)
      }
      else{
        console.log(doc);
      }
    }) 
  }
  if (x=="image"){
    Course.findOneAndUpdate({title:req.body["name"]},{$set:{ image:y}},{new:true},(err,doc)=>{
      if (err){
        console.log(err)
      }
      else{
        console.log(doc);
      }
    }) 
  }

  if (x=="title"){
    Course.findOneAndUpdate({title:req.body["name"]},{$set:{ title:y}},{new:true},(err,doc)=>{
      if (err){
        console.log(err)
      }
      else{
        console.log(doc);
      }
    }) 
  
  }
  res.redirect("/")
  
})