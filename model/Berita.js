const mongoose = require('mongoose')
const Schema = mongoose.Schema

const BeritaSchema = new Schema({
  tag: {
    type: String
  },
  judul: {
    type: String
  },
  isi: {
    type: String
  },
  image: {
    type: String
  }
})

module.exports = mongoose.model('berita', BeritaSchema)