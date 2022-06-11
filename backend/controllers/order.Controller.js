const paypal = require('paypal-rest-sdk');

const Order = require('../models/order.Model');
const Product = require('../models/product.Model');

const ErrorResponse = require('../utils/ErrorResponse');
const catchAsyncError = require('../middlewares/catchAsyncError.middleware');

exports.newOrder = catchAsyncError(async (req, res, next) => {
    const { orderItems, shipingInfo, itemPrice, taxPrice} = req.body;

    const totalPrice = itemPrice + taxPrice + 10000;

    const order = await Order.create({
        orderItems, 
        shipingInfo,
        itemPrice,
        taxPrice,
        shipingPrice: 10000,
        totalPrice: totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    })

    res.status(200).json({
        success: true,
        order
    })
})

exports.getSingleOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate('user', 'name email')
    let data = []

    if (!order) return next(new ErrorResponse('No Order found with this id', 404));

    for (let i=0;i<order.orderItems.length;i++){

        let product = await Product.findById(order.orderItems[i].id_product.toString());
        data.push({
            name: product.name,
            price: product.price,
            sale: product.sale
        });
    }

    res.status(200).json({
        order, data
    })
})

exports.myOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.find({user: req.user.id})

    res.status(200).json({
        success: true,
        order
    })
})

exports.ViewMyOrder = catchAsyncError(async (req, res, next) => {
    let order = await Order.findById(req.params.id);
    let data = [];

    if (!order)
        return next(new ErrorResponse('Not found order', 404));
    if (order.user.toString() !== req.user._id.toString()) 
        return next(new ErrorResponse('You not have role to view this order', 404));

    for (let i=0;i<order.orderItems.length;i++){
        let product = await Product.findById(order.orderItems[i].id_product.toString());
        data.push({
            name: product.name,
            price: product.price,
            sale: product.sale
        });
    }
    
    res.status(200).json({
        success: true,
        order,
        data
    })
})

exports.allOrder = catchAsyncError(async (req, res, next) => {
    const orders = await Order.find();

    let totalAmount = 0;
    orders.forEach(order =>{
        totalAmount += order.totalPrice
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders
    })
})

exports.updateOrder = catchAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);


    if (order.orderStatus === 'Delivered' || order.orderStatus === 'Cancelled')
        return next(new ErrorResponse(`You have already ${order.orderStatus} this order`, 400));

    if (req.body.orderStatus === 'Delivered') {
        order.orderItems.forEach(async item => {
            await updateStock(item.id_product.toString(), item.quantity)
        })
    }

    order.orderStatus = req.body.orderStatus,
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
        order
    })
})

async function updateStock(id, quantity){
    const product = await Product.findById(id);
    product.stock = product.stock - quantity;
    await product.save({validateBeforeSave: false});
}