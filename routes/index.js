var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var productModel = require('../models/productModel.js');
var categoryModel = require('../models/categoryModel.js');
var brandModel = require('../models/brandModel.js');
var subCategoryModel = require('../models/subCategoryModel.js');

var fs = require('fs');

/*
var product = new productModel({
    category: 'Tenis',
    subcategory: '',
    product: 'Tenis',
    model: 'NYC',
    brand: 'Osiris',
    size:  '8,7,5',
    price: '870',
    description :'aqui va una descripción del producto',
    color : 'Rojo/negro',
    imgPath1: 'images/products/Osiris-NYC.jpg',
    quantity: 3,
    isOutlet: true
});

//product.img1.data = fs.readFileSync(imgPath);
//product.img1.contentType = 'jpg';

product.save(function(err, products) {
    if (err) return console.error(err);
    console.dir(products);
});//*/

/*
 var brand = new brandModel({
 name: 'Osiris',
 category: ['Skate','Accesorios'],
 subCategory:['']
 });
 brand.save(function(err, brands) {
 if (err) return console.error(err);
 console.dir(brands);
 });//*/


/*
 var subCategory = new subCategoryModel({
 name :  'Playeras',
 category: 'Ropa',
 ImgPath: '/images/subCategoriasRopa/Playeras.jpg'
 });
 subCategory.save(function(err, subCategories) {
 if (err) return console.error(err);
 console.dir(subCategories);
 });//*/


/*
 var category = new categoryModel({
 name :  'Otros'
 });
 category.save(function(err, categories) {
 if (err) return console.error(err);
 console.dir(categories);
 });//*/


router.get('/', function(req, res) {
    categoryModel.find({},function(err,categories) {
        productModel.find({}, function(err,products){
            res.render('index',
                {categories: categories, products: products});
        });
    })
});

router.get('/index', function(req, res) {
    categoryModel.find({},function(err,categories) {
        productModel.find({}, function(err,products){
            res.render('index',
                {categories: categories, products: products});
        });
    })
});

router.get('/contact', function(req, res){
    categoryModel.find({},function(err,categories) {
        res.render('contact', {
            categories: categories,
            title: 'Contacto'
        });
    });
});


router.get('/outlet', function(req, res) {
    categoryModel.find({},function(err,categories) {
        productModel.find({isOutlet: true}).sort('-uploadDate').exec(function(err,products){
            brandModel.find({}).sort('name').exec(function(err,brands){
                res.render('Products', {
                    categories: categories,
                    products: products,
                    brands:brands,
                    title: 'Outlet'
                });
            });
        });
    })
})

router.get('/:category', function(req, res) {
    subCategoryModel.find({category:req.params.category}).sort('name').exec(function(err,subCategories){
        categoryModel.find({},function(err,categories) {
            brandModel.find({category:req.params.category}).sort('name').exec(function(err,brands){
                res.render('submenu', {
                    categories: categories,
                    subCategories: subCategories,
                    brands: brands,
                    title: req.params.category
                });
            });
        });
    })
})

router.get('/:category/:subCategory', function(req, res) {
    if (req.params.category == 'Tenis') {

        categoryModel.find({}, function (err, categories) {
            productModel.find({category: 'Tenis'}).sort('-uploadDate').exec(function (err, products) {
                brandModel.find({category: 'Tenis'}).sort('name').exec(function (err, brands) {
                    res.render('products', {
                        categories: categories,
                        products: products,
                        brands: brands,
                        category: 'Tenis',
                        title: 'Tenis'
                    });
                });
            });
        })

    } else {
        categoryModel.find({}, function (err, categories) {
            productModel.find({subcategory: req.params.subCategory}).sort('-uploadDate').exec(function (err, products) {
                brandModel.find({subCategory: req.params.subCategory}).sort('name').exec(function (err, brands) {
                    res.render('products', {
                        categories: categories,
                        products: products,
                        brands: brands,
                        title: req.params.subCategory,
                        category: req.params.category
                    });
                });
            });
        })
    }
})
//*/

router.get('/:category/detail/:id', function(req, res) {

    productModel.findById(mongoose.Types.ObjectId(req.params.id), function(err,product){
        categoryModel.find({},function(err,categories) {
            brandModel.find({category:product.category}).sort('name').exec(function(err,brands) {
                res.render('detail',
                {
                    product: product,
                    categories: categories,
                    brands: brands,
                    category: product.category

                });
            });
        });
    })
});


router.get('/:category/brand/:brand', function(req, res) {
    productModel.find({brand: req.params.brand, category: req.params.category}, function(err,products){
        categoryModel.find({},function(err,categories) {
            brandModel.find({category: req.params.category}).sort('name').exec(function(err,brands) {
                res.render('Products',
                    {
                        products: products,
                        categories: categories,
                        brands: brands,
                        title: req.params.category + ' -/ ' +' /- '+ req.params.brand,
                        category: req.params.category
                    });
            });
        });
    })
});

router.get('/add', function(req, res){
    res.render('addItem');
});


module.exports = router;
