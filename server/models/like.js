const mongoose = require('mongoose')
const Schema = mongoose.Schema

const likeSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
        autopopulate: true
    },
    dateSign: {
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

likeSchema.plugin(require('mongoose-autopopulate'))

const Like = mongoose.model('like', likeSchema)

module.exports = Like