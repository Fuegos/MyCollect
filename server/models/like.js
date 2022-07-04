const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dateSign: {
        type: Date,
        required: true,
        default: Date.now
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
    }
})

const Like = mongoose.model('like', likeSchema)

module.exports = Like