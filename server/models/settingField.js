const mongoose = require('mongoose')
const Schema = mongoose.Schema

const settingFieldSchema = new Schema({
    label: {
        type: String,
        required: true
    },
    typeField: {
        type: Schema.Types.ObjectId,
        ref: 'type_field',
        required: true,
        autopopulate: true
    }
})

settingFieldSchema.plugin(require('mongoose-autopopulate'))

const SettingField = mongoose.model('setting_field', settingFieldSchema)

module.exports = SettingField