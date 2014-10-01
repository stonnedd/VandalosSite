var product = require('../models/productModel');

function loadType(req, res, next) {
    product.findOne({username: req.params.category}, function(err, user) {
        if (err) {
            return next(err);
        }
        if (! user) {
            return res.send('Not found', 404);
        }
        req.user = user;
        next();
    });
}
module.exports = loadType;