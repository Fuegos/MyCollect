const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const http = require('http')
const mongoose = require('mongoose')
const socketIO = require('socket.io')

const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const collectionRoutes = require('./routes/collectionRoutes')
const itemRoutes = require('./routes/itemRoutes')
const commentRoutes = require('./routes/commentRoutes')
const likeRoutes = require('./routes/likeRoutes')
const searchRoutes = require('./routes/searchRoutes')

require('dotenv').config()

const app = express()
const server = http.createServer(app)
const io = socketIO(server, {
    cors: {
      origin: '*',
    }
})
app.set('socket', io)

const urlencodeParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json(), urlencodeParser);

app.use("/", authRoutes)
app.use("/", adminRoutes)
app.use("/", collectionRoutes)
app.use("/", itemRoutes)
app.use("/", commentRoutes)
app.use("/", likeRoutes)
app.use("/", searchRoutes)

app.use(express.static(path.join(__dirname, '../client', 'build')))

const PORT = process.env.PORT || 5000

io.on('connection', (socket) => {
    console.log('I am user')

    socket.on('join:item', room => {
        console.log("joined " + room)
        socket.join(room)     
    })

    socket.on('leave:item', room => {
        console.log("leaved " + room)
        socket.leave(room)
    })

    socket.on('disconnect', () => {
        console.log("Chaooo")
    })
});

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
    server.listen(PORT, () => console.log("Server was running"))
})
.catch((err) => console.error(err))
