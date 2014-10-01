var mongoose = require('mongoose');
var ProductSchema = require('../schemas/productSchema.js');

var Product = mongoose.model('Product',ProductSchema);
module.exports = Product;

