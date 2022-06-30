const mongoose = require('mongoose')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
    img: {
        type: Schema.Types.ObjectId,
        ref: 'image'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    theme: {
        type: Schema.Types.ObjectId, 
        ref: 'hobby',
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true
    }
})

const Collection = mongoose.model('collection', collectionSchema)

module.exports = Collection