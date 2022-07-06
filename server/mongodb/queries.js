const User = require('../models/user')

const getUserByName = async name => await User.findOne({ name })
const getUserByEmail = async email => await User.findOne({ email })
const getUserById = async id => await User.findById( id )
const setDateLoginUser = async user => await User.findByIdAndUpdate(user._id, {dateLogin: new Date()})

const deleteOneById = async (id, model) => {
    return await model.findOneAndDelete({ _id: id })
}

const deleteManyByIds = async (ids, model) => {
    return Promise.all(
        ids.map(id => deleteOneById(id, model))
    )
}

module.exports = {
    getUserByName,
    getUserByEmail,
    getUserById,
    setDateLoginUser,
    deleteOneById,
    deleteManyByIds
}