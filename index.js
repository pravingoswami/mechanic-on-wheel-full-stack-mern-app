const express = require('express')
const setupDB = require('./config/database')
const router = require('./config/routes')
const cors = require('cors')

const app = express()
setupDB()

app.use(cors())
app.use('/upload', express.static('upload'))
app.use(express.json())
app.use('/', router)

const port = 3017

app.listen(port , () => {
    console.log('listening on the port', port)
})