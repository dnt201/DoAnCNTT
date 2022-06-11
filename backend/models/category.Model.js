const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter category name']
    },
    parent: {
        type: String,
        default: ''
    },
    image: {
        type: String,
    }
})

module.exports = mongoose.model('Category', categorySchema);