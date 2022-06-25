const express = require('express')
const mongoose = require('mongoose')
const request = require('request')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const Hobby = require('../models/hobby')
const fileUploader = require('../cloudinary/cloudinary.config')
require('dotenv').config()

router.post('/api/collection/upload/img', checkAuth, fileUploader.single('file'), (req, res) => {
    try {
        if (!req.file) {
            return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.upload}`)
        }
        return res.json({ img: req.file.path })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

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
        Hobby.find({category: 'Collection'}, "_id title").then(result => res.json(result))
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
            res.json(collections)
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router