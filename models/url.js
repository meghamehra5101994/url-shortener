var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// schema for counter
var counterSchema = Schema({
    _id: {type: String, required: true},
    seq: { type: Number, default: 0 }
});



// create a schema for urls
var miniurlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});


// before inserting function
miniurlSchema.pre('save', function(next){
  var self = this;
  counter.findByIdAndUpdate({_id: 'url_count'}, {$inc: {seq: 1} }, function(error, counter) {
      if (error)
          return next(error);
      self.created_at = new Date();
      self._id = counter.seq;
      next();
  });
});
var counter = mongoose.model('counter', counterSchema);
var Url = mongoose.model('Url', miniurlSchema);

module.exports = Url;
