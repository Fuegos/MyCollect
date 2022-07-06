const { cloudinary } = require('./cloudinary.config')

const deleteImage = filename => {
    cloudinary.uploader.destroy(filename, async error => {
        if(error) {
            throw error
        }
    })
}

module.exports = deleteImage