const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const Theme = require('../models/theme')

router.post('/api/collection/add', checkAuth, (req, res) => {
    try {
        req.body.owner = req.user
        Collection.create(req.body).then(result => res.json(result))
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.get('/api/collection/themes', checkAuth, (req, res) => {
    try {
        Theme.find({}).then(themes => res.json(themes))
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.get('/api/collections', checkAuth, (req, res) => {
    try {
        Collection.find({ owner: req.user })
        .populate('owner')
        .populate('theme')
        .then(collections => {
            console.log(collections)
            res.json(collections)
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router