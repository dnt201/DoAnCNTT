const mongoose = require('mongoose');

const computerScreenSchema = new mongoose.Schema({
    size: {
        type: String,
        required: [true, 'Please enter the screen size']
    },
    resolution: {
        type: String,
        required: [true, 'Please enter the screen resolution']
    },
    hz: {
        type: String,
        required: [true, 'Please choose the screen refresh rate']
    },
    restime: {
        type: String,
        required: [true, 'Please enter the screen response time']
    },
    panel: {
        type: String,
        required: [true, 'Please choose the screen panel']
    },
    corlorSpace: {
        type: String,
        required: [true, 'Please enter the screen color depth']
    }
});

module.exports = mongoose.model('ComputerScreen', computerScreenSchema);