const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')


const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag',
        required: true
    }],
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: shortid.generate
    },
    collectionRef: {
        type: Schema.Types.ObjectId,
        ref: 'collection',
        required: true
    }
})

const Item = mongoose.model('item', itemSchema)

module.exports = Item