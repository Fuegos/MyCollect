const mongoose = require('mongoose')
const Schema = mongoose.Schema

const imageSchema = new Schema({
    path: {
        type: String,
        required: true
    },
    filename: {
        type: String,
        required: true
    }
})

const Image = mongoose.model('image', imageSchema)

module.exports = Image