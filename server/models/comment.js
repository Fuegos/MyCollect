const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    dateSend: {
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

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment