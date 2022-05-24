const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fName: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    phone: {
        required: true,
        type: String
    },
    country: {
        required: true,
        type: String
    },
    city: {
        required: true,
        type: String
    }



})

module.exports = mongoose.model('User', userSchema)