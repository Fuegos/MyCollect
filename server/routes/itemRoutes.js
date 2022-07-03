const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const FieldItems = require('../models/field_items')
const Item = require('../models/item')
const Tag = require('../models/tag')
const ValueField = require('../models/value_field')
require('dotenv').config()

router.get('/api/collection/items', checkAuth, async (req, res) => {
    try {
        const collection = await Collection.findById(req.query.collectionId)
                                .populate('img')
                                .populate('owner')
                                .populate('theme')

        const itemFields = await FieldItems.find({collectionRef: collection})
                                .populate('collectionRef')
                                .populate('typeField')
        
        const items = await Item.find({collectionRef: collection})
                                .populate('tags')
                                .populate({
                                    path: 'fields',
                                    populate: {
                                        path: 'fieldItem',
                                        model: FieldItems
                                    }
                                })
        
        return res.json({items, collection, itemFields})
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.get('/api/tags', checkAuth, async (req, res) => {
    try {
        Tag.find({}).then(result => res.json(result))
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.delete('/api/collection/item', checkAuth, (req, res) => {
    try {
        
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})


router.post('/api/collection/item', checkAuth, (req, res) => {
    try {
        const item = {
            _id: req.body._id,
            name: req.body.name,
            collectionRef: req.body.collectionRef
        }

        const updateTag = async t => {
            const tag = typeof t === 'string' ? { name: t } : t
            return await Tag.findByIdAndUpdate(
                tag._id ?? new mongoose.Types.ObjectId(), tag, { upsert: true, new: true }
            )
        }

        const updateTags = async () => {
            return Promise.all(
                req.body.tags.map(t => updateTag(t))
            )
        }

        const updateField = async f => {
            return await ValueField.findByIdAndUpdate(
                f._id ?? new mongoose.Types.ObjectId(), f, { upsert: true, new: true }
            )
        }

        const updateFields = async () => {
            return Promise.all(
                req.body.fields.map(f => updateField(f))
            )
        }

        updateTags().then(tags => {
            updateFields().then(fields => {
                item.tags = tags
                item.fields = fields
                Item.findByIdAndUpdate(
                    item._id ?? new mongoose.Types.ObjectId(), item, { upsert: true, new: true }
                ).populate('tags')
                .populate({
                    path: 'fields',
                    populate: {
                        path: 'fieldItem',
                        model: FieldItems
                    }
                })
                .populate('collectionRef')
                .then(result => res.json(result))
            })
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router