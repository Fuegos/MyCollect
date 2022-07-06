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
    const item = await Item.findOne(
        { shortId: req.query.itemShortId }
    )
    
    if(item === null)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)

    Comment.find(
        { itemRef: item }
    ).then(comments => res.json({ item, comments }))
})

router.post('/api/comment', checkAuth, async (req, res) => {
    req.body.user = req.user
    const comment = await Comment.create(req.body)
    const socket = req.app.get('socket')
    socket.to(req.body.itemRef._id).emit('get:comment', comment)
    return res.json(comment)
})

module.exports = router