const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
require('dotenv').config()
const router = express.Router()
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const { getUserByName, getUserByEmail, getUserById, setDateLoginUser } = require('../mongodb/queries')


const comparePassword = async user => await bcrypt.hash(user.password, 10)


const authenticateUser = (res, user) => {
    const payload = {
        id: user._id
    }

    jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {expiresIn: 86400},
        (err, token) => {
            if(err) {
                console.error(err)
                return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
            }
            if(user.status === 'blocked') {
                return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.block}`)
            }
            return res.json({
                email: user.email,
                name: user.name,
                isAdmin: user.role === 'admin',
                token: "Bearer " + token
            })
        }
    )
}


router.post('/api/auth/sign/up', async (req, res) => {
    try {
        const user = req.body
        if(await getUserByName(user.name)) {
            return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.name}`)
        }
        if(await getUserByEmail(user.email)) {
            return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.email}`)
        }
        user.password = await comparePassword(user)
        User.create(user).then(createdUser => {
            setDateLoginUser(createdUser)
            return authenticateUser(res, createdUser)
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.get('/api/auth/token', (req, res) => {
    try {
        const token = req.headers["x-access-token"]?.split(' ')[1]
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if(err) {
                    return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
                }
                const user = await getUserById(decoded.id)
                if(user) {
                    setDateLoginUser(user)
                    return authenticateUser(res, user)
                } else {
                    return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
                }
            })
        } else {
            return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
        }
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

router.get('/api/auth/sign/in', async (req, res) => {
    try {
        const userParams = req.query
        const user = await getUserByEmail(userParams.email)
        if(!user) {
            return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.data}`)
        }
        bcrypt.compare(userParams.password, user.password).then(result => {
            if(!result) {
                return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.data}`)
            }
            setDateLoginUser(user)
            return authenticateUser(res, user)
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
})

module.exports = router