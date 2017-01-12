var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for counter
var counterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});

var Counter = mongoose.model('counter', counterSchema);

// create a schema for urls
var miniurlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});


// before inserting function
miniurlSchema.pre('save', function(next){
  var self = this;
  Counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
    console.log(counter);
    if (error)
          return next(error);
      self.created_at = new Date();
      if(counter != null){
        self._id = counter.seq;
      }
      else{
      var add = {
        _id: 'url_count',
        seq:1
       }
      Counter.create(add);
      self._id = add.seq - 0;
      }
    next();
  });
});

var Url = mongoose.model('Url', miniurlSchema);

module.exports = Url;
