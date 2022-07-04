const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Like = require('../models/like')
const Item = require('../models/item')
require('dotenv').config()

router.get('/api/likes', checkAuth, async (req, res) => {
    try {
        const item = await Item.findById(req.query.itemId)

        const likes = await Like.find({item: item})
                            .populate('user')
        return res.json({likes, item})
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.post('/api/like', checkAuth, async (req, res) => {
    try {
        const recivedLike = {
            item: req.body,
            user: req.user
        }
        const like = await Like.findOne({item: recivedLike.item, user: recivedLike.user })
        if(like) {
            await Like.findByIdAndDelete(like._id)
        } else {
            await Like.create(recivedLike)
        }
        const likes = await Like.find({item: recivedLike.item})
                            .populate('user')
        return res.json(likes)
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router