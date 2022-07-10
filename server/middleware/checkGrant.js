const { CODE_ERROR, ERROR, SUBJECT } = require('../error/dataError')
const { sendErrorToClient } = require('../error/handlerError')
const Collection = require('../models/collection')
const Item = require('../models/item')

const checkGrantCollection = async (collectionId, req, res, next) => {
    const collection = await Collection.findById(collectionId)
    if(collection) {
        if(collection.owner._id.toString() !== req.user._id.toString()
            && !req.user.isAdmin
        ) {
            return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.collection}`)
        }
    }
    next()
}

const checkGrantItem = async (itemId, req, res, next) => {
    const item = await Item.findById(
        itemId
    ).populate({
        path: 'collectionRef',
        populate: {
            path: 'owner'
        }
    })

    if(item) {
        if(item.owner._id.toString() !== req.user._id.toString()
            && !req.user.isAdmin 
            && item.collectionRef.owner._id.toString() !== req.user._id.toString()
        ) {
            return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.item}`)
        }
    }

    next()
}


const checkGrantItems = async (itemIds, req, res, next) => {
    const items = await Item.find(
        { _id: { $in: itemIds }}
    ).populate({
        path: 'collectionRef',
        populate: {
            path: 'owner'
        }
    })

    if(items.some(item =>
            item.owner._id.toString() !== req.user._id.toString()
            && !req.user.isAdmin 
            && item.collectionRef.owner._id.toString() !== req.user._id.toString()
    )) {
        return sendErrorToClient(res, CODE_ERROR.forbidden, `${ERROR.forbidden}.${SUBJECT.item}`)
    }

    next()
}

module.exports = {
    checkGrantCollection,
    checkGrantItem,
    checkGrantItems
}