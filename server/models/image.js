const mongoose = require('mongoose')
const deleteImage = require('../cloudinary/deleteImage')
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

imageSchema.post('findOneAndDelete', result => {
    deleteImage(result.filename)
})

const Image = mongoose.model('image', imageSchema)

module.exports = Image