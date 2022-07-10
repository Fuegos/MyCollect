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
        required: true,
        autopopulate: true
    },
    dateSend: {
        type: Date,
        required: true,
        default: Date.now
    },
    itemRef: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
    }
})

commentSchema.plugin(require('mongoose-autopopulate'))

commentSchema.index({
    text: 'text'
})

const Comment = mongoose.model('comment', commentSchema)

module.exports = Comment