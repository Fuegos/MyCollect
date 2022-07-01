const mongoose = require('mongoose')
const Schema = mongoose.Schema

const valueFieldSchema = new Schema({
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'item',
        required: true
    },
    fieldItem: {
        type: Schema.Types.ObjectId,
        ref: 'field_items',
        required: true
    }
})

const ValueField = mongoose.model('value_field', valueFieldSchema)

module.exports = ValueField