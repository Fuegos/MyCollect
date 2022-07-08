const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Like = require('../models/like')
const Item = require('../models/item')
require('dotenv').config()


router.post('/api/like', checkAuth, async (req, res) => {
    const item = await Item.findById(req.body.itemId)

    const recivedLike = {
        user: req.user,
        itemRef: item
    }

    const like = await Like.findOne({
        user: recivedLike.user,
        itemRef: recivedLike.itemRef
    })

    if(like) {
        await Like.findByIdAndDelete(like._id).then(result => res.json(result))
    } else {
        await Like.create(recivedLike).then(result => res.json(result))
    }
})

module.exports = router