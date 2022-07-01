const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const Item = require('../models/item')
const ValueField = require('../models/value_field')
require('dotenv').config()

router.get('/api/collection/items', checkAuth, async (req, res) => {
    try {
        const collection = await Collection.findById(req.query.collectionId)
                                .populate('img')
                                .populate('owner')
                                .populate('theme')
        const items = await Item.find({collectionRef: collection}).populate('tags')
        items.forEach(async i => {
            i.fields = await ValueField.find({item: i}).populate('fieldItem')
        })
        return res.json({items, collection})
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router