var express =require('express');
var app =express();
var bodyParser = require('body-parser');
var mongoose =require('mongoose');
var path = require('path');
var base58 = require('./base58.js');
var Url = require('./models/url');
var config = require('./config');

//Mongoose Connect
mongoose.Promise = global.Promise;
mongoose.connect(config.dbpath);
var db = mongoose.connection ;

app.use(express.static(__dirname+ '/client'));
app.use(bodyParser.json());
app.use('/client',express.static(__dirname + '/client'));

app.get('/',function (req,res) {
   res.sendFile(path.join(__dirname + '/client/index.html'));
});


app.post('/api/url', function(req, res){
  var longUrl = req.body.url;
  console.log("longurl"+longUrl);
  var shortUrl = '';
  // check if url already exists in database
  Url.findOne({long_url: longUrl}, function (err, doc){
    if (doc){
      shortUrl = config.webhost + base58.encode(doc._id);
      console.log(base58.encode(doc._id));
      console.log("shortUrl---"+shortUrl);
      // return it without creating a new entry
      res.send({'shortUrl': shortUrl});
    } else {
      // doesn't exist, creating it:
      var newUrl = Url({
        long_url: longUrl
      });

      // save the new link
      newUrl.save(function(err) {
        if (err){
          console.log(err);
        }

        shortUrl = config.webhost + base58.encode(newUrl._id);
        console.log("els eshortUrl---"+shortUrl);
        res.send({'shortUrl': shortUrl});
      });
    }

  });

});

app.get('/:encoded_id', function(req, res){

  var base58Id = req.params.encoded_id;

  var id = base58.decode(base58Id);

  // check if url already exists in database
  Url.findOne({_id: id}, function (err, doc){
    if (doc) {
      res.redirect(doc.long_url);
    } else {
      res.redirect(config.webhost);
    }
  });

});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('Started on port '+ port);