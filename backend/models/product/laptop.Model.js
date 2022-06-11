const mongoose = require('mongoose');

const laptopSchema = new mongoose.Schema({
    cpu: {
        type: String,
        required: [true, 'Please enter the laptop CPU']
    }, 
    monitor: {
        size: {
            type: String,
            required: [true, 'Please choose the laptop size']
        },
        hz: {
            type: String,
            required: [true, 'Please choose the laptop refresh rate']
        },
        resolution: {
            type: String,
            required: [true, 'Please choose the laptop resolution']
        }
    },
    ram: {
        type: String,
        required: [true, 'Please choose the laptop memory']
    },
    storage: {
        hdd: {       
            type: String,
            required: [true, 'Please choose the laptop SSD storage']
        },
        ssd: {       
            type: String,
            required: [true, 'Please choose the laptop HDD storage']
        }
    },
    vga: {
        type: String,
        required: [true, 'Please choose the laptop graphic card']
    },
    weight: {
        type: String,
        required: [true, 'Please enter the laptop weight']
    }
});

module.exports = mongoose.model('Laptop', laptopSchema);