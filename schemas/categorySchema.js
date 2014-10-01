var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var categorySchema   = new Schema({
    name :  {type: String},
    uploadDate :  {type: Date, default: Date.now}
});
module.exports = categorySchema;