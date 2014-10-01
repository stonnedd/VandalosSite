/**
 * Created by SnD on 09/09/2014.
 */
var tennis = require('models/dataModels/tennisSchema')

exports.create = function ( req, res ){
    new tennis({
        modelo: ae,
        marca: osiris,
        talla: 27,
        precio: 600
    }).save( function( err, todo, count ){
            res.redirect( '/' );
        });
};