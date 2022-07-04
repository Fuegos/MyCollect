const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Comment = require('../models/comment')
const Item = require('../models/item')
require('dotenv').config()

router.get('/api/comments', checkAuth, async (req, res) => {
    try {
        const item = await Item.findById(req.query.itemId)

        const comments = await Comment.find({item: item})
                            .populate('user')
        
        return res.json({comments, item})
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.post('/api/comment', checkAuth, async (req, res) => {
    try {
        req.body.user = req.user
        const comment = await Comment.create(req.body)
        const socket = req.app.get('socket')
        socket.to(req.query.room).emit('get:comment', comment)
        return res.json(comment)
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router