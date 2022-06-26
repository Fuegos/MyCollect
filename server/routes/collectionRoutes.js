const express = require('express')
const mongoose = require('mongoose')
const request = require('request')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAuth = require('../middleware/checkAuth')
const Collection = require('../models/collection')
const Hobby = require('../models/hobby')
const { uploadCloud, cloudinary } = require('../cloudinary/cloudinary.config')
const Image = require('../models/image')
require('dotenv').config()
const shortid = require('shortid')

const deleteImage = (res, filename) => {
    cloudinary.uploader.destroy(filename, async (error, result) => {
        if(error) {
            console.error(error)
            return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
        } else {
            return await Image.findOneAndRemove({filename})   
        }
    })
}


router.post('/api/collection/upload/img', checkAuth, uploadCloud.single('file'), (req, res) => {
    try {
        Image.create({ path: req.file.path, filename: req.file.filename })
            .then(result => res.json(result))
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.delete('/api/collection/delete/img', checkAuth, (req, res) => {
    try {
        return res.json(deleteImage(res, req.body.filename))
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.post('/api/collection/modify', checkAuth, (req, res) => {
    try {
        req.body.collection.owner = req.user
        Collection.findByIdAndUpdate(req.body._id ?? shortid.generate(), req.body.collection, { upsert: true, new: true })
            .populate('owner')
            .populate('theme')
            .populate('img')
            .then(result => res.json(result))
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.delete('/api/collection/delete', checkAuth, (req, res) => {
    try {
        if(req.body.img) {
            deleteImage(res, req.body.img.filename)
        }
        Collection.findByIdAndDelete(req.body._id)
        .then(result => res.json(result))
        
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
        .populate('img')
        .then(collections => {
            res.json(collections)
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router