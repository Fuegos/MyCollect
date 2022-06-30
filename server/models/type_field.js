const mongoose = require('mongoose')
const Schema = mongoose.Schema

const typeFieldSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

const TypeField = mongoose.model('type_field', typeFieldSchema)

module.exports = TypeField