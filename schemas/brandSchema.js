var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var brandSchema = new Schema({
    name :  {type: String},
    category :  [String],
    subCategory: [String],
    uploadDate :  {type: Date, default: Date.now}
});
module.exports = brandSchema;



