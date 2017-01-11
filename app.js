var express =require('express');
var app =express();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var path = require('path');

//Mongoose Connect
mongoose.connect(process.env.DBPATH || 'mongodb://localhost:27017/test');
var db = mongoose.connection ;

app.use(express.static(__dirname+ '/client'));
app.use(bodyParser.json());
app.use('/client',express.static(__dirname + '/client'));

app.get('/',function (req,res) {
   res.sendFile(path.join(__dirname + '/client/index.html'));
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Started on port '+ port);