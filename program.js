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
var Post = mongoose.model('messages', { UserName: String, Email: String, MessageText: String });

app.get('/', function (req, res) {
//    var temp=Post.find();
//    console.log(temp);
var data = Post.find().then(function(posts){
    console.log(posts);
      res.render('layout', { page: 'index', data: posts});

});
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
app.get('/newMessage', function (req, res) {
    res.render('layout', { title: 'Send a message', page: 'newPost' });
});



app.post('/newMessage' , function(req, res){
    console.log(req.body);
    var ms = new Date();
    var fname="./Files/" + ms.getFullYear()+ms.getDate()+ms.getDay()+ms.getHours()+ms.getMinutes()+ms.getSeconds()+".txt";
    var newMsg = new Post({ UserName: req.body.name, Email: req.body.subject, MessageText: req.body.message});
    newMsg.save(function (err) {
        if (err) {
            console.log(err);
        } });
    res.json(200, {status: 'success'});
});

app.listen(3000);