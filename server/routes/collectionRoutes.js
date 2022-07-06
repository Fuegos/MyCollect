const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const Hobby = require('../models/hobby')
const { uploadCloud } = require('../cloudinary/cloudinary.config')
const Image = require('../models/image')
require('dotenv').config()
const SettingField = require('../models/settingField')
const TypeField = require('../models/type_field')


router.post('/api/image', checkAuth, uploadCloud.single('file'), (req, res) => {
    Image.create(
        { path: req.file.path, filename: req.file.filename }
    ).then(result => res.json(result))
})

router.delete('/api/image', checkAuth, (req, res) => {
    Image.findOneAndDelete({ _id: req.body._id }).then(result => res.json(result))
})

router.post('/api/collection', checkAuth, (req, res) => {
    req.body.collection.owner = req.user
    Collection.findByIdAndUpdate(
        req.body._id ?? new mongoose.Types.ObjectId(), 
        req.body.collection, 
        { upsert: true, new: true }
    ).then(result => res.json(result))
})

router.delete('/api/collection', checkAuth, (req, res) => {
    Collection.findOneAndDelete(
        { _id: req.query.collectionId }
    ).then(result => res.json(result))
})

router.get('/api/themes', checkAuth, (req, res) => {
    Hobby.find(
        {category: 'Collection'}, 
        "_id title"
    ).then(result => res.json(result))
})

router.get('/api/collections', checkAuth, (req, res) => {
    Collection.find(
        { owner: req.user }
    ).then(result => res.json(result))
})

router.post('/api/collection/setting/fields', checkAuth, async (req, res) => {
    const collectionId = req.query.collectionId
    const oldCollection = await Collection.findById(collectionId)

    const updateSettingField = async f => {
        return await SettingField.findByIdAndUpdate(
            f._id, f, { upsert: true, new: true }
        )
    }

    const updateSettingFields  = async () => {
        return Promise.all(
            req.body.map(f => updateSettingField(f))
        )
    }

    updateSettingFields().then(async result => {
        const oldFields = oldCollection.settingFields.map(f => f._id)
        const newFields = result.map(f => f._id.toString())

        console.log(oldFields, newFields)
        await SettingField.deleteMany({
            _id: { $in: oldFields.filter(f => !newFields.includes(f.toString())) }
        })
        Collection.findByIdAndUpdate(
            collectionId, 
            {settingFields: result}
        ).then(collection => res.json(collection))
    })
})

router.get('/api/type/fields', checkAuth, (req, res) => {
    TypeField.find({}).then(result => res.json(result))
})

router.get('/api/collection/setting/fields', checkAuth, (req, res) => {
    Collection.findById(
        req.query.collectionId
    ).then(result => res.json(result.settingFields))
})

module.exports = router