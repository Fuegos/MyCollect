const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const Comment = require('./comment')
const Like = require('./like')
const Field = require('./field')
const { deleteManyByIds } = require('../mongodb/queries')


const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'tag',
        required: true,
        autopopulate: true
    }],
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: shortid.generate
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now
    },
    fields: [{
        type: Schema.Types.ObjectId,
        ref: 'field',
        autopopulate: true
    }],
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true,
        autopopulate: true
    },
    collectionRef: {
        type: Schema.Types.ObjectId,
        ref: 'collection',
        required: true,
        autopopulate: true
    }
})

itemSchema.plugin(require('mongoose-autopopulate'))

itemSchema.post('findOneAndDelete', async result => {
    const comments = await Comment.find({ itemRef: result })
    await deleteManyByIds(comments.map(i => i._id), Comment)

    const likes = await Like.find({ itemRef: result })
    await deleteManyByIds(likes.map(i => i._id), Like)

    await Field.deleteMany({ 
        _id: { $in: result.fields.map(f => f._id)}
    })
})

const Item = mongoose.model('item', itemSchema)

module.exports = Item