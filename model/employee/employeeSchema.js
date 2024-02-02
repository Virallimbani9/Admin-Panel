const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'Please enter an id'],
    },
    name: {
        type: String,
        required: [true, 'Please enter a name'],
    },
    image: String,
    phone:{
        type:String,
        required: [true, 'Please enter a phone'],
    },
    city: {
        type: String
    },
    gender:{
        type: String
    },
    designation: {
        type: String,
        // required: [true, 'Please enter a designation'],
    },
    salary: {
        type: String,
        // required: [true, 'Please enter a salary'],
    },
    status: {
        type: String,
        default: 'active'
    },
    });

module.exports = mongoose.model('Employee', employeeSchema);