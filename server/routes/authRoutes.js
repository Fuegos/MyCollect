const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config()
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const { getUserByName, getUserByEmail, getUserById, setDateLoginUser } = require('../mongodb/queries')
const { comparePassword, createTokenAndAuthUser, authUser } = require('../auth/auth')
const checkAuth = require('../middleware/checkAuth')


router.post('/api/user/sign/up', async (req, res) => {
    const user = req.body
    if(await getUserByName(user.name)) {
        return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.name}`)
    }
    if(await getUserByEmail(user.email)) {
        return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.email}`)
    }
    user.password = await comparePassword(user)
    User.create(user).then(async newUser => {
        const result = await createTokenAndAuthUser(newUser)
        if(result.error) {
            return sendErrorToClient(res, result.error, result.type)
        }
        return res.json(result)
    })
})

router.get('/api/user/token', checkAuth, (req, res) => {
    return res.json(req.user)
})

router.get('/api/user/sign/in', async (req, res) => {
    const userParams = req.query
    const user = await getUserByEmail(userParams.email)
    if(!user) {
        return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.data}`)
    }
    bcrypt.compare(userParams.password, user.password).then(async result => {
        if(!result) {
            return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.data}`)
        }
        const newUser = await createTokenAndAuthUser(user)
        if(newUser.error) {
            return sendErrorToClient(res, newUser.error, newUser.type)
        }
        return res.json(newUser)
    })
})

module.exports = router