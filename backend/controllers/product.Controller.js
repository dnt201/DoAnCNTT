const Category = require('../models/Category.Model');

const Product = require('../models/product.Model');
const Laptop = require('../models/product/laptop.Model');
const ComputerScreen = require('../models/product/computerScreen.Model');

const APIFeatures = require('../utils/APIFeatures');
const ErrorResponse = require('../utils/ErrorResponse');
const CatchAsyncError= require('../middlewares/catchAsyncError.middleware');
const { modelNames } = require('mongoose');

//New Product => api/v1/admin/products/new
exports.newProduct = CatchAsyncError(async(req, res, next) => {
    let Data = req.body;

    switch(Data.type){
        case 'ComputerScreen':
            const computerScreen = await ComputerScreen.create(Data.Data);
            Data.Data = computerScreen
            break;
        case 'Laptop':
            const laptop = await Laptop.create(Data.Data);
            Data.Data = laptop;
            break;
    }   

    const product = await Product.create(Data);
    res.status(201).json({
        success: true,
        product
    })
})

//Get All Product => api/v1/products/
exports.getProducts = CatchAsyncError(async (req, res, next) => {

    if (req.query.category === undefined) return next(new ErrorResponse('Please fill out the category', 400));

    const resPerPage = 9;
    const api = new APIFeatures(Product.find(), req.query).search().filter();
    let product = await api.query;
    const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().pagination(resPerPage)
    let products = await apiFeatures.query;


    for (let i = 0; i < products.length; i++){
        let value = new Object;
        switch (products[i].type){
            case "Laptop": 
                value = await Laptop.findById(products[i].Data.toString());
                break;
            case "ComputerScreen":
                value = await ComputerScreen.findById(products[i].Data.toString());
                break;
            default: 
                break;
        }
        
        products[i] = {
            "id": products[i].id,
            "name": products[i].name,
            "category": products[i].type,
            "type": products[i].category,
            "price": products[i].price,
            "image": products[i].images,
            "sale": products[i].sale,
            "saleEnd": products[i].saleEnd
        }
        if (products[i].category === 'Laptop'){
            products[i].shortInfomation = {
                cpu: value.cpu, 
                monitor: value.monitor,
                ram: value.ram,
                storage: value.storage,
                vga: value.vga,
                weight: value.weight
            }
        }
        else if (products[i].category === 'ComputerScreen') {
            products[i].shortInfomation = {
                size: value.size,
                resolution: value.resolution,
                hz: value.hz,
                restime: value.restime,
                panel: value.panel,
                corlorSpace: value.corlorSpace

            }
        }

        if (products[i].saleEnd < Date.now()) {
            products[i].sale = 0,
            products[i].saleEnd = undefined;
        }
    }

    res.status(200).json({
        success: true,
        total: product.length,
        count: products.length,
        products: products,
        message: 'This route will show all product'
    })
})

//Get Product => api/v1/products/:id
exports.getSingleProduct = CatchAsyncError(async (req, res, next) => {
    let product = await Product.findById(req.params.id);
    let data;

    if (!product)
        return next(new ErrorResponse("Product not found", 404));
    
    if (product.type === 'Laptop'){
        data = await Laptop.findById(product.Data.toString());
        product.Data = data;
    }
    else if (product.type === 'ComputerScreen'){
        data = await ComputerScreen.findById(product.Data.toString());
        product.Data= data;
    }
    
    res.status(200).json({
        success: true,
        product,
        data
    })
})

//Get List Brand => api/v1/products/brands
exports.getBrand = CatchAsyncError(async (req, res, next) => {
    
    const name = (req.query.category).split('+').join(' ');

    const category = await Category.find({name: name}).select("");
    if (category.length===0)
        return next(new ErrorResponse('Not found category', 404));

    let brands = []
    const ListProduct = await Product.find({category: name}).select('brand');
    for (let data of ListProduct)
        if (brands.indexOf(data.brand)===-1) brands.push(data.brand);


    res.status(200).json({
        success: true,
        brands
    })

})

//Update Product => api/v1/admin/products/:id
exports.updateProduct = CatchAsyncError(async (req, res, next) => {
    
    const apiFeatures = new APIFeatures(Product.findById(req.params.id), '')
    let product = await apiFeatures.query;

    let infoUpdate = req.body;
    if (infoUpdate.saleEnd) infoUpdate.saleEnd = new Date(infoUpdate.saleEnd);

    if (!product)
        return next(new ErrorResponse("Product not found", 404));

    if (product.type === 'Laptop'){
        await Laptop.findByIdAndUpdate(product.Data.toString(),infoUpdate.Data, {
            new : true, runValidators: true, useFindAndModify: false
        })
    }
    else if (product.type === 'ComputerScreen'){
        await ComputerScreen.findByIdAndUpdate(product.Data.toString(),infoUpdate.Data, {
            new : true, runValidators: true, useFindAndModify: false
        })
    }

    delete infoUpdate.Data
    let value = infoUpdate.type;
    infoUpdate.type = infoUpdate.category;
    infoUpdate.category = value;

    product = await Product.findByIdAndUpdate(req.params.id,  infoUpdate, 
    {
        new : true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        product
    })
})

//Delete Product => api/v1/admin/products/:id
exports.deleteProduct = CatchAsyncError(async (req, res, next) => {
    
    const apiFeatures = new APIFeatures(Product.findById(req.params.id), req.query)
    const product = await apiFeatures.query;

    if (!product)
        return next(new ErrorResponse("Product not found", 404));

    await Product.remove(product);
    res.status(200).json({
        success: true,
        message: "Product deleted successfully"
    })
})

// Create a reviews => /api/v1/reiew
exports.createProductReview = CatchAsyncError(async (req, res, next) => {

    const {rating, comment, productId} = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    const product = await Product.findById(productId);
    const isReviewed = product.reviews.find(
        review => review.user.toString() === req.user._id.toString()
    )

    if (isReviewed){
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user._id.toString()){
                review.comment = comment;
                review.rating = rating;
            }
        })
    }
    else {
        product.reviews.push(review);
        product.numberofReviews = product.reviews.length
    }

    product.ratings = product.reviews.reduce((sum, item) => item.rating + sum, 0) / product.reviews.length

    await product.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        product
    })
})

// Get All Reviews => /api/v1/reviews
exports.getProductReviews = CatchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete a review => api/v1/reviews
exports.deleteReview = CatchAsyncError(async (req, res, next) => {
    let  product = await Product.findById(req.query.productId);
    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.toString()); 
    //=> id la review
    
    const numberofReviews = reviews.length;
    let ratings = reviews.reduce((sum, item) => item.rating + sum, 0) / reviews.length;
    if (!ratings) ratings = 0;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        numberofReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    product = await Product.findById(req.query.productId);

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

exports.deleteMyReview = CatchAsyncError(async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    const reviews = product.reviews.filter(review => review.user.toString() !== req.user._id.toString());
    const numberofReviews = reviews.length;
    const ratings = reviews.reduce((sum, item) => item.rating + sum, 0) / reviews.length

    await Product.findByIdAndUpdate(req.query.id, {
        reviews,
        ratings,
        numberofReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})