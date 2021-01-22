const express = require("express");
const app = express();
const mongoose = require("mongoose");
const sendMail = require('./mail');
const path = require('path');
mongoose.connect('mongodb+srv://admin-Sourav:Incorrect1@cluster0.ii7x8.mongodb.net/myideasdb', {useNewUrlParser: true,useUnifiedTopology: true });
const ideaschema={
  Email:String,
  Name:String,
  Idea:String,
  Subject:String
};
const Ideamodel=new mongoose.model("Ideamodel",ideaschema);

app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());

app.get("/ideas",function(req,res)
{
  res.sendFile(__dirname+"/Putideas.html");
});
app.post("/submit",function(req,res)
{
  const { name,subject, email, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(name,email, subject, text, function(err, data) {
        if (err) {
            console.log('ERROR: ', err);
            return res.status(500).json({ message: err.message || 'Internal Error' });
        }
        const ideaone=new Ideamodel({
          Email:email,
          Name:name,
          Idea:text,
          Subject:subject
        });
        ideaone.save(function(err){
          if (!err){
            console.log('Email sent and saved!!!');
           res.redirect("/ideas");

         }
      });
    });
});
app.get('/error', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'error.html'));
});

// Email sent page
app.get('/email/sent', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'emailMessage.html'));
});
app.listen(3000,function()
{
  console.log("Server started on port 3000")
});
