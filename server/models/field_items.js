const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fieldItemsSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    typeField: {
        type: Schema.Types.ObjectId,
        ref: 'type_field',
        required: true
    },
    collectionRef: {
        type: Schema.Types.ObjectId,
        ref: 'collection',
        required: true
    }
})

const FieldItems = mongoose.model('field_items', fieldItemsSchema)

module.exports = FieldItems