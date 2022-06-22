const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const mongoose = require('mongoose')

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const collectionRoutes = require('./routes/collectionRoutes')

require('dotenv').config()

const app = express()

const urlencodeParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodeParser);

app.use("/", authRoutes)
app.use("/", adminRoutes)
app.use("/", collectionRoutes)

app.use(express.static(path.join(__dirname, '../client', 'build')))


const PORT = process.env.PORT || 5000

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
})

mongoose.connect(
    process.env.DB,
    { 
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    }
)
.then(() => {
    console.log("DB connect is successful")
    app.listen(PORT, () => console.log("Server was running"))
})
.catch((err) => console.error(err))
