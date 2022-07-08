const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const Item = require('../models/item')
const Tag = require('../models/tag')
const Field = require('../models/field')
const { deleteManyByIds } = require('../mongodb/queries')
const { checkGrantItems, checkGrantItem, checkGrantCollection } = require('../middleware/checkGrant')
const Comment = require('../models/comment')
const Like = require('../models/like')
require('dotenv').config()

router.get('/api/items/last', async (req, res) => {
    Item.find(
        {}
    ).sort({dateCreated: -1})
    .limit(req.query.limit)
    .then(result => res.json(result))
})

router.get('/api/collection/items', async (req, res) => {
    const collection = await Collection.findOne(
        { shortId: req.query.collectionShortId }
    )

    if(collection === null) 
        return sendErrorToClient(res, CODE_ERROR.notFound, `${ERROR.notFound}.${SUBJECT.collection}`)
    
    Item.find(
        { collectionRef: collection }
    ).then(items => {
        res.json({collection, items})
    })
})

router.get('/api/item', async (req, res) => {
    const item = await Item.findOne(
        { shortId: req.query.itemShortId }
    )

    if(item === null) 
        return sendErrorToClient(res, CODE_ERROR.notFound, `${ERROR.notFound}.${SUBJECT.item}`)

    const likes = await Like.find(
        { itemRef: item }
    )

    const comments = await Comment.find(
        { itemRef: item }
    )

    return res.json({ item, likes, comments })
})

router.get('/api/tags', async (req, res) => {
    Tag.find({}).then(result => res.json(result))
})

router.delete(
    '/api/collection/items', 
    checkAuth,
    (req, res, next) => {
        checkGrantItems(req.body, req, res, next)
    },
    (req, res) => {
        deleteManyByIds(req.body, Item).then(result => res.json(result))
})


router.post('/api/collection/item', 
    checkAuth, 
    (req, res, next) => {
        req.body._id ?
            checkGrantItem(req.body._id, req, res, next) :
            checkGrantCollection(req.body.collectionRef._id, req, res, next)
    },
    async (req, res) => {
        const item = {
            _id: req.body._id,
            name: req.body.name,
            collectionRef: req.body.collectionRef,
            owner: req.body.owner || req.user
        }

        const oldItem = await Item.findById(item._id)
        
        const updateTag = async t => {
            if(typeof t === 'string') {
                const tag = await Tag.findOne({ name: t})
                if(tag) {
                    return tag
                } else {
                    return await Tag.create({ name: t })
                }  
            }
            return t
        }

        const updateTags = async () => {
            return Promise.all(
                req.body.tags.map(t => updateTag(t))
            )
        }

        const updateField = async f => {
            return await Field.findByIdAndUpdate(
                f._id ?? new mongoose.Types.ObjectId(), 
                f, 
                { upsert: true, new: true }
            )
        }

        const updateFields = async () => {
            return Promise.all(
                req.body.fields.map(f => updateField(f))
            )
        }


        updateTags().then(tags => {
            item.tags = tags
            updateFields().then(async fields => {
                item.fields = fields
                const oldFields = oldItem ? oldItem.fields.map(f => f._id) : []
                const newFields = fields.map(f => f._id.toString())
                await Field.deleteMany({
                    _id: { $in: oldFields.filter(f => !newFields.includes(f.toString())) }
                })

                Item.findByIdAndUpdate(
                    item._id ?? new mongoose.Types.ObjectId(), 
                    item, 
                    { upsert: true, new: true }
                ).then(result => res.json(result)) 
            })
        })
    }
)

module.exports = router