const mongoose = require('mongoose')
const Schema = mongoose.Schema

const hobbySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
        required: true
    }
})

const Hobby = mongoose.model('hobby', hobbySchema)

module.exports = Hobby