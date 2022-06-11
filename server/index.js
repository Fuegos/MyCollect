const express = require('express')
const path = require('path')

require('dotenv').config()

const app = express()

app.use(express.static(path.join(__dirname, '../client', 'build')))

const PORT = process.env.PORT || 5000

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'build', 'index.html'));
})

app.listen(PORT, () => console.log("Server was running"))