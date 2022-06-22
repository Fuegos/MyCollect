const mongoose = require('mongoose')
const shortid = require('shortid')
const Schema = mongoose.Schema

const themeSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        default: shortid.generate
    },
    name: {
        type: String,
        required: true,
        unique: true
    }
})

const Theme = mongoose.model('theme', themeSchema)

module.exports = Theme