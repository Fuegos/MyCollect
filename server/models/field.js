const mongoose = require('mongoose')
const Schema = mongoose.Schema

const fieldSchema = new Schema({
    value: {
        type: Schema.Types.Mixed,
        required: true
    },
    settingField: {
        type: Schema.Types.ObjectId,
        ref: 'setting_field',
        required: true,
        autopopulate: true
    }
})

fieldSchema.plugin(require('mongoose-autopopulate'))

fieldSchema.index({
    value: 'text'
})

const Field = mongoose.model('field', fieldSchema)

module.exports = Field