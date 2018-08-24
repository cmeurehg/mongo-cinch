var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NewsSchema = new Schema({
 
  title: {
    type: String,
    required: true
  },
 
  link: {
    type: String,
    required: true
  },
  
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});


var News = mongoose.model("News", NewsSchema);


module.exports = News;
