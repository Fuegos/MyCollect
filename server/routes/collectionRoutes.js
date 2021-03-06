const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const Hobby = require('../models/hobby')
const { uploadCloud } = require('../cloudinary/cloudinary.config')
const Image = require('../models/image')
require('dotenv').config()
const SettingField = require('../models/settingField')
const TypeField = require('../models/type_field')
const { checkGrantCollection } = require('../middleware/checkGrant')
const { updateMany } = require('../mongodb/queries')


router.post('/api/image', checkAuth, uploadCloud.single('file'), (req, res) => {
    Image.create(
        { path: req.file.path, filename: req.file.filename }
    ).then(result => res.json(result))
})

router.delete('/api/image', checkAuth, (req, res) => {
    Image.findOneAndDelete({ _id: req.body._id }).then(result => res.json(result))
})

router.post(
    '/api/collection', 
    checkAuth, 
    (req, res, next) => {
        checkGrantCollection(req.body._id, req, res, next)
    }, 
    (req, res) => {
        req.body.collection.owner = req.body.collection.owner || req.user
        
        Collection.findByIdAndUpdate(
            req.body._id ?? new mongoose.Types.ObjectId(), 
            req.body.collection, 
            { upsert: true, new: true }
        ).then(result => res.json(result))
})

router.delete(
    '/api/collection', 
    checkAuth, 
    (req, res, next) => {
        checkGrantCollection(req.query.collectionId, req, res, next)
    }, 
    (req, res) => {
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

router.get('/api/collections/biggest', (req, res) => {
    const limit = Number(req.query.limit)
    Collection.aggregate([
        {
            $lookup: {
                from: "items",
                localField: "_id",
                foreignField: "collectionRef",
                as: "item"
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner"
            }
        },
        {
            $lookup: {
                from: "images",
                localField: "img",
                foreignField: "_id",
                as: "img"
            }
        },
        {
            $lookup: {
                from: "hobbies",
                localField: "theme",
                foreignField: "_id",
                as: "theme"
            }
        },
        {
            $unwind: {
                path: '$item',
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $group: {
                _id: "$_id",
                name: { $first: "$name" },
                shortId: { $first: "$shortId" },
                img: { $first: { $arrayElemAt: ['$img', 0] } },
                owner: { $first: { $arrayElemAt: ['$owner', 0] } },
                theme: { $first: { $arrayElemAt: ['$theme', 0] } },
                count: { $sum: {
                    $cond: [{ $eq: [ { $type: "$item" }, "object" ] }, 1, 0]
                }}
            }
        },
        {
            $sort: {
                "count": -1
            }
        },
        {
            $limit: limit
        }
    ])
    .then(result => {
        res.json(result)
    })
})

router.post(
    '/api/collection/setting/fields', 
    checkAuth, 
    (req, res, next) => {
        checkGrantCollection(req.query.collectionId, req, res, next)
    },
    async (req, res) => {
        const collectionId = req.query.collectionId
        const oldCollection = await Collection.findById(collectionId)


        updateMany(req.body, SettingField).then(async result => {
            const oldFields = oldCollection.settingFields.map(f => f._id)
            const newFields = result.map(f => f._id.toString())

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

router.get(
    '/api/collection/setting/fields', 
    checkAuth, 
    (req, res, next) => {
        checkGrantCollection(req.query.collectionId, req, res, next)
    },
    (req, res) => {
        Collection.findById(
            req.query.collectionId
        ).then(result => res.json(result.settingFields))
    }
)

module.exports = router