const express = require('express')
const bcrypt = require('bcrypt')

const User = require('../models/user')
const router = express.Router()

const CODE_ERROR = {
    auth: 401,
    forbidden: 403,
    server: 500  
}

const ERROR = {
    auth: 'auth',
    forbidden: 'forbidden',
    server: 'server'
}

const SUBJECT = {
    auth: 'auth',
    email: 'email',
    data: 'data',
    name: 'name',
    server: 'server'
}

const sendErrorToClient = (res, error, type) => res.status(error).json({ type: `server.error.${type}` })

router.get('/api/admin/users', (req, res) => {
    try {
        User.find({}, "_id name email dateRegistration dateLogin status role").then(users => {
            return res.json(users)
        })
    } catch {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router