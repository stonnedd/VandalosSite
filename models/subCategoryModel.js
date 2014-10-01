var mongoose = require('mongoose');
var SubCategorySchema = require('../schemas/subCategorySchema.js');

var SubCategory = mongoose.model('subCategory',SubCategorySchema);
module.exports = SubCategory;