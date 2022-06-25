const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema

const collectionSchema = new Schema({
    _id: {
        type: String,
        default: shortid.generate
    },
    img: {
        type: String
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
        type: Schema.Types.String, 
        ref: 'user',
        required: true
    }
})

const Collection = mongoose.model('collection', collectionSchema)

module.exports = Collection