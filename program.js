var express = require('express');
var app = express();
app.use('/images', express.static('images'));
app.use('/swal', express.static('swal'));
app.use('/img', express.static('img'));
app.set('view engine', 'ejs');
app.use('/css', express.static('css'))
var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));; 
const fs = require('fs');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var Message = mongoose.model('message', { UserName: String, Email: String, MessageText: String });



app.get('/', function (req, res) {
  res.render('layout', { title: 'Welcome!', page: 'index'});
});
app.get('/AboutUs', function (req, res) {
  res.render('layout', { title: 'I did it with ♥ =P', page: 'AboutUs'});
});
  
app.get('/mimimi', function (req, res) {
    var fs = require("fs"),
    path = require("path");

    var p = "./images"
    fs.readdir(p, function (err, files) {
        if (err) {
            throw err;
        }
        res.render('layout', { title : 'mimimi', images: files, page: 'mimimi' });
    });
   
});
app.get('/contact', function (req, res) {
    res.render('layout', { title: 'Send me a message', page: 'contact'});
});



app.post('/contact' , function(req, res){
    console.log(req.body);
    var message="User name: " + req.body.name +'\n'+"Email: " +req.body.email +'\n'+"Message: " +req.body.message;
    var ms = new Date();
    var fname="./Files/" + ms.getFullYear()+ms.getDate()+ms.getDay()+ms.getHours()+ms.getMinutes()+ms.getSeconds()+".txt";
    var newMsg = new Message({ UserName: req.body.name, Email: req.body.email, MessageText: req.body.message});
    newMsg.save(function (err) {
        if (err) {
            console.log(err);
        } });
   // console.log(newMsg);
    // res.render('layout', { title: 'Send me one more message', page: 'contact'});
    res.json(200, {status: 'success'});
});

app.listen(3000);