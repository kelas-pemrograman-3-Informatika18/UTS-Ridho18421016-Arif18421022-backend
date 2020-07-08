const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require('path')

const mongoURL = 'mongodb://localhost:27017/Now_News'
mongoose.connect(mongoURL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() =>{
  console.log('Berhasil konek ke database')
}).catch((err) => {
  console.log('Gagal konek ke database')
})

const directory = path.join(__dirname, '/statics/')
app.use(express.static(directory))
app.use(cors())

app.use(bodyParser.json({
  extended: true,
  limit: '20mb',
}))

app.use(bodyParser.urlencoded({
  extended: true,
  limit: '20mb'
}))

//list my route
app.use('/user', require('./routes/User'))
app.use('/berita', require('./routes/Berita'))

app.listen(5001, function () {
  console.log('Server Started in port 5001')
})