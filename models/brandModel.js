var mongoose = require('mongoose');
var BrandSchema = require('../schemas/brandSchema.js');

var Brand = mongoose.model('Brand',BrandSchema);
module.exports = Brand;


