var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema for urls
var urlSchema = new Schema({
  _id: {type: Number, index: true},
  long_url: String,
  created_at: Date
});