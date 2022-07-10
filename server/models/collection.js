const mongoose = require('mongoose')
const Schema = mongoose.Schema
const shortid = require('shortid')
const SettingField = require('./settingField')
const Image = require('./image')
const Item = require('./item')
const { deleteManyByIds } = require('../mongodb/queries')
const User = require('./user')

const collectionSchema = new Schema({
    img: {
        type: Schema.Types.ObjectId,
        ref: 'image',
        autopopulate: true
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
        required: true,
        autopopulate: true
    },
    shortId: {
        type: String,
        unique: true,
        required: true,
        default: shortid.generate
    },
    owner: {
        type: Schema.Types.ObjectId, 
        ref: 'user',
        required: true,
        autopopulate: true
    },
    settingFields: [{
        type: Schema.Types.ObjectId,
        ref: 'setting_field',
        autopopulate: true
    }]
})

collectionSchema.plugin(require('mongoose-autopopulate'))

collectionSchema.post('findOneAndDelete', async result => {
    result.img && await Image.findOneAndDelete({ _id: result.img._id })
    await deleteManyByIds(result.settingFields.map(s => s._id), SettingField)
    const items = await Item.find({ collectionRef: result })
    await deleteManyByIds(items.map(i => i._id), Item)
})

collectionSchema.index({
    name: 'text',
    description: 'text'
})

const Collection = mongoose.model('collection', collectionSchema)

module.exports = Collection