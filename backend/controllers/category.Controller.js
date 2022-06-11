const Product = require('../models/product.Model')
const Category = require('../models/Category.Model')
const APIFeatures = require('../utils/APIFeatures');
const ErrorResponse = require('../utils/ErrorResponse');
const CatchAsyncError= require('../middlewares/catchAsyncError.middleware');


//New Category => api/v1/admin/categories/new
exports.newCategory = CatchAsyncError(async(req, res, next) => {
    const product = await Category.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
})

//Get All Categories => api/v1/categories/
exports.getCategories = CatchAsyncError(async(req, res, next) => { 

    const apiFeatures = new APIFeatures(Category.find().select('name parent image'), req.query)
    const Data = await apiFeatures.query;

    let listCategories = [];

    for (var i=0; i<Data.length; i++) {
        let Path = Data[i].parent.split('/');

        if (Path.length == 1)
            listCategories.push(new Object({
                "id": Data[i]._id,
                "image": Data[i].image,
                "path": Data[i].name.split(' ').join("-"), 
                "name": Data[i].name, 
                "children": []
            }));
        
        
        if (Path.length == 2){
            for (let j=0; j<listCategories.length; j++)
                if (listCategories[j].name === Path[1]) 
                listCategories[j].children.push(new Object({
                    "id": Data[i]._id,
                    "image": Data[i].image,
                    "path": Data[i].name.split(' ').join("-"), 
                    "name": Data[i].name, 
                    "children": []
                }));
        }
        //if (Path.length == 2) 
        //    listCategories[Path[1]][Data[i].name] ={"name": Data[i].name, "path": Data[i].name};
        //if (Path.length == 3)
        //    listCategories[Path[1]][Path[2]][Data[i].name] ={"name": Data[i].name, "path": Data[i].name};
        //if (Path.length == 4) 
        //    listCategories[Path[1]][Path[2]][Path[3]][Data[i].name] = {"name": Data[i].name, "path": Data[i].name};
    }
    
    listCategories = recheck(listCategories);

    res.status(200).json({
        success: true,
        categories: listCategories,
        message: "Success"
    })
})

exports.getCategory = CatchAsyncError(async (req, res, next) => {
    let dataReturn = "Category";

    const apiFeatures = new APIFeatures(Category.find(), req.query).searchExact();
    let category = await apiFeatures.query;
    
    if (category.length != 0){
        const reqFindItem = category[0]["parent"] + '/' + category[0]["name"];
        const newAPIFeatures = new APIFeatures(Category.find({"parent": reqFindItem}), req.query)
        category = await newAPIFeatures.query;

        if (category.length == 0){
            const getProduct = new APIFeatures(Product.find({"category": reqFindItem}), req.query)
            category = await getProduct.query;
            dataReturn = "Product"
        }
    }

    res.status(200).json({
        success: true,
        categories: category,
        typeData: dataReturn,
        message: "Success"
    })
})

//Update category => api/v1/categories/:id
exports.updateCategory = CatchAsyncError(async(req, res, next) => {
    
    const apiFeatures = new APIFeatures(Category.findById(req.params.id), req.query)
    let category = await apiFeatures.query;

    if (!category){
        return res.status(404).json({
            success: false,
            message: "Category not found"
        })
    }


    category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new : true,
        runValidators: true,
        useFindAndModify: false
    })

    res.send(200).json({
        success: true
    })
})

exports.deleteCategory = CatchAsyncError(async (req, res, next) => {
    const apiFeatures = new APIFeatures(Category.findById(req.params.id), req.query)
    let category = await apiFeatures.query;

    if (!category){
        return res.status(404).json({
            success: false,
            message: "Category not found"
        })
    }

    const reqFindItem = category.parent + '/' + category.name;
    const newAPIFeatures = new APIFeatures(Category.find({"parent": reqFindItem}), req.query)
    category = await newAPIFeatures.query;

    if (category.length == 0){
        const getProduct = new APIFeatures(Product.find({"category": reqFindItem}), req.query)
        category = await getProduct.query;
    }

    if (category.length != 0)
        return next(new ErrorResponse('Category exist item. Try again', 400));
    else {
        await Category.findByIdAndRemove(req.params.id);    
    }

    res.status(200).send({
        success: true,
    })
})

function recheck(Data){
    for (let i=0; i<Data.length; i++)
        if (Data[i].children.length == 0) Data[i].children = undefined;
        else recheck(Data[i].children)
    
    return Data;
}