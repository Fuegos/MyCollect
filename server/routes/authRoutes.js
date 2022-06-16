const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const User = require('../models/user')
//const verifyJWT = require('../verifyJWT')

require('dotenv').config()

const router = express.Router()

const CODE_ERRORS = {
    "auth": 401,
    "forbidden": 403,
    "server": 500  
}

const getUserByName = async name => await User.findOne({ name })

const getUserByEmail = async email => await User.findOne({ email })

const getUserById = async id => await User.findById( id )

const setDateLoginUser = async user => await User.findByIdAndUpdate(user._id, {dateLogin: new Date()})

const comparePassword = async user => await bcrypt.hash(user.password, 10)

const sendErrorToClient = (res, error, message) => res.status(CODE_ERRORS[error]).json({ message })

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
                return sendErrorToClient(res, 'auth', 'Error authentication')
            }
            return res.json({
                email: user.email,
                name: user.name,
                token: "Bearer " + token
            })
        }
    )
}

router.post('/api/auth/sign/up', async (req, res) => {
    try {
        const user = req.body
        if(await getUserByName(user.name)) {
            return sendErrorToClient(res, 'forbidden', 'This name has took')
        }
        if(await getUserByEmail(user.email)) {
            return sendErrorToClient(res, 'forbidden', 'This email has took')
        }
        user.password = await comparePassword(user)
        User.create(user).then(createdUser => {
            setDateLoginUser(createdUser)
            return authenticateUser(res, createdUser)
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, 'server', 'Error server')
    }
})

router.get('/api/auth/token', (req, res) => {
    try {
        const token = req.headers["x-access-token"]?.split(' ')[1]
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if(err) {
                    return sendErrorToClient(res, 'auth', 'Error authentication')
                }
                const user = await getUserById(decoded.id)
                if(user) {
                    setDateLoginUser(user)
                    return authenticateUser(res, user)
                } else {
                    return sendErrorToClient(res, 'auth', 'Error authentication')
                }
            })
        } else {
            return sendErrorToClient(res, 'auth', 'Error authentication')
        }
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, 'server', 'Error server')
    }
})

router.get('/api/auth/sign/in', async (req, res) => {
    try {
        const userParams = req.query
        const user = await getUserByEmail(userParams.email)
        if(!user) {
            return sendErrorToClient(res, 'auth', 'Invalid email or password')
        }
        bcrypt.compare(userParams.password, user.password).then(result => {
            if(!result) {
                return sendErrorToClient(res, 'auth', 'Invalid email or password')
            }
            setDateLoginUser(user)
            return authenticateUser(res, user)
        })
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, 'server', 'Error server')
    }
})

module.exports = router