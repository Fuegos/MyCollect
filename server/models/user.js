const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema

const userSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateLogin: {
        type: Date
    },
    dateRegistration: {
        type: Date,
        required: true,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
        required: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true
    }
})

const User = mongoose.model('user', userSchema)

module.exports = User