const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const Collection = require('../models/collection')
const Comment = require('../models/comment')
const Field = require('../models/field')
const Hobby = require('../models/hobby')
const Item = require('../models/item')
const Tag = require('../models/tag')
require('dotenv').config()


router.get('/api/search', async (req, res) => {
    let result = []
    result = result.concat(await Collection.aggregate([
        {
            $match: {
                $text: { $search: req.query.text }
            }
        },
        {
            $project: {
                name: "$name",
                shortId: "$shortId",
                type: "collection",
                avatar: "search.type.collection",
                score: { $meta: "textScore" },
                text: {
                    head: "search.type.collection.description",
                    body: { $concat: ['$name', ' ', '$description']}
                } 
            }
        },
    ]))

    result = result.concat(await Hobby.aggregate([
        {
            $match: {
                $text: { $search: req.query.text }
            }
        },
        {
            $lookup: {
                from: "collections",
                localField: "_id",
                foreignField: "theme",
                as: "collection"
            }
        },
        {
            $project: {
                collection: { $arrayElemAt: ['$collection', 0] },
                title: 1
            }
        },
        {
            $match: {
                collection: { $exists: true }
            }
        },
        {
            $project: {
                type: 'collection',
                avatar: "search.type.collection",
                name: "$collection.name",
                shortId: "$collection.shortId",
                score: { $meta: "textScore" },
                text: {
                    head: "search.type.collection.theme",
                    body: "$title"
                }
            }
        }
    ]))

    result = result.concat(await Tag.aggregate([
        {
            $match: {
                $text: { $search: req.query.text }
            }
        },
        {
            $lookup: {
                from: "items",
                let: {'tag' : '$_id'},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [ '$$tag', '$tags' ]
                            }
                        }
                    }
                ],
                as: "item"
            }
        },
        {
            $project: {
                item: { $arrayElemAt: ['$item', 0] },
                name: 1
            }
        },
        {
            $match: {
                item: { $exists: true }
            }
        },
        {
            $project: {
                type: 'item',
                avatar: 'search.type.item',
                name: "$item.name",
                shortId: "$item.shortId",
                score: { $meta: "textScore" },
                text: {
                    head: "search.type.item.tag",
                    body: "$name"
                }
            }
        }
    ]))

    result = result.concat(await Field.aggregate([
        {
            $match: {
                $text: { $search: req.query.text }
            }
        },
        {
            $lookup: {
                from: "items",
                let: {'field' : '$_id'},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [ '$$field', '$fields' ]
                            }
                        }
                    }
                ],
                as: "item"
            }
        },
        {
            $project: {
                item: { $arrayElemAt: ['$item', 0] },
                value: 1 
            }
        },
        {
            $match: {
                item: { $exists: true }
            }
        },
        {
            $project: {
                type: 'item',
                avatar: 'search.type.item',
                name: "$item.name",
                shortId: "$item.shortId",
                score: { $meta: "textScore" },
                text: {
                    head: "search.type.item.value",
                    body: "$value"
                } 
            }
        }
    ]))

    result = result.concat(await Item.aggregate([
        {
            $match: {
                $text: { $search: req.query.text }
            }
        },
        {
            $project: {
                type: "item",
                avatar: "search.type.item",
                name: "$name",
                shortId: "$shortId",
                score: { $meta: "textScore" },
                text: {
                    head: "search.type.item.description",
                    body: "$name"
                } 
            }
        },
    ]))


    result = result.concat(await Comment.aggregate([
        {
            $match: {
                $text: { $search: req.query.text }
            }
        },
        {
            $lookup: {
                from: "items",
                localField: "itemRef",
                foreignField: "_id",
                as: "item"
            }
        },
        {
            $project: {
                item: { $arrayElemAt: ['$item', 0] },
                text: 1
            }
        },
        {
            $project: {
                type: 'item',
                avatar: "search.type.item",
                name: "$item.name",
                shortId: "$item.shortId",
                score: { $meta: "textScore" },
                text: {
                    head: "search.type.item.comment",
                    body: "$text"
                }
            }
        }
    ]))

    return res.json(result.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)).slice(0, 20))
})

router.get('/api/search/tag', async (req, res) => {
    let result = []
    
    result = result.concat(await Tag.aggregate([
        {
            $match: {
                $text: { $search: req.query.text }
            }
        },
        {
            $lookup: {
                from: "items",
                let: {'tag' : '$_id'},
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $in: [ '$$tag', '$tags' ]
                            }
                        }
                    }
                ],
                as: "item"
            }
        },
        {
            $project: {
                item: { $arrayElemAt: ['$item', 0] },
                name: 1
            }
        },
        {
            $match: {
                item: { $exists: true }
            }
        },
        {
            $project: {
                type: 'item',
                avatar: 'search.type.item',
                name: "$item.name",
                shortId: "$item.shortId",
                score: { $meta: "textScore" },
                text: {
                    head: "search.type.item.tag",
                    body: "$name"
                }
            }
        }
    ]))

    return res.json(result.sort((a, b) => parseFloat(b.score) - parseFloat(a.score)).slice(0, 20))
})

module.exports = router