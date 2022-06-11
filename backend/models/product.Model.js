const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [1000, 'Product name cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Please enter product description']
    },
    price: {
        type: Number,
        default: 0.0,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product price cannot exceed 5 characters']
    },
    brand: {
        type: String,
        required: [true, 'Please enter the laptop brand']
    },
    ratings:{
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    category: {
        type: String,
        required: true
    },  
    images: {
        type: String
    },
    stock: {
        type: Number,
        required: [true, 'Please enter product stock'],
        maxLength: [5, "Product stock cannot exceed 5 characters"], 
        default: 0
    },
    numberofReview: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            name: {
                type: String,
                require: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ], 
    createAt: {
        type: Date,
        default: Date.now
    },
    sale: {
        type: Number,
        default: 0
    },
    saleEnd: {
        type: Date,
        default: Date.now
    },
    type: {
        type: String,
        required: true,
        enum: [
            'None', 
            'Laptop', 
            'ComputerScreen'
        ],
        default: 'None'
    },
    Data: {
        type: mongoose.Schema.Types.ObjectId,
        refpath: 'type'
    }
})

module.exports = mongoose.model('Product', productSchema);