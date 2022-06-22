const jwt = require('jsonwebtoken')
const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const { getUserById } = require('../mongodb/queries')
require('dotenv').config()

const checkAuth = (req, res, next) => {
    try {
        const token = req.headers["x-access-token"]?.split(' ')[1]
        if(token) {
            jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
                if(err) {
                    return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
                }
                const user = await getUserById(decoded.id)
                if(!user) {
                    return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
                } 
                if(user.status === 'blocked') {
                    return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.block}`)
                }
                req.user = user
                next()
            })
        } else {
            return sendErrorToClient(res, CODE_ERROR.auth, `${ERROR.auth}.${SUBJECT.auth}`)
        }
    } catch(e) {
        console.error(e)
        return sendErrorToClient(res, CODE_ERROR.server, `${ERROR.server}.${SUBJECT.server}`)
    }
}

module.exports = checkAuth