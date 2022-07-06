const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('../models/user')
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const checkAdmin = require('../middleware/checkAdmin')
const checkAuth = require('../middleware/checkAuth')


router.get('/api/admin/users', checkAuth, checkAdmin, (req, res) => {
    User.find(
        {}, {password: 0}
    ).then(users => res.json(users))
})

router.put('/api/admin/users/status/:status', checkAuth, checkAdmin, (req, res) => {
    User.updateMany(
        {
            _id: {
                $in: req.body.map(u => u._id)
            }
        },
        { status: req.params.status }
    ).then(result => res.json(result))
})

router.put('/api/admin/users/role/:role', checkAuth, checkAdmin, (req, res) => {
    User.updateMany(
        {
            _id: {
                $in: req.body.map(u => u._id)
            }
        },
        { role: req.params.role }
    ).then(result => res.json(result))
})

router.delete('/api/admin/users', checkAuth, checkAdmin, (req, res) => {
    User.deleteMany({
        _id: {
            $in: req.body.map(u => u._id)
        }
    }).then(result => res.json(result))
})

module.exports = router