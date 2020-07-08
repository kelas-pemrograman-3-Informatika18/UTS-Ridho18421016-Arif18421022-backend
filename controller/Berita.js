const beritaController = require('../model/Berita')
const objectId = require('mongoose').Types.ObjectId
const { deleteImage } = require('../uploadConfig')

exports.simpanKegiatan = (data) =>
  new Promise((resolve, reject) => {
    beritaController.create(data)
      .then(() => {
        resolve({
          sukses: true,
          pesan: 'Berhasil Input Kegiatan'
        })
      }).catch(() => {
        reject({
          sukses: false,
          pesan: 'Gagal Input Kegiatan'
      })
    })
  })

exports.tampilKegiatan = () =>
  new Promise((resolve, reject) => {
    beritaController.find({})
    .then(data => {
      resolve({
        sukses: true,
        pesan: 'Berhasil Memuat Data',
        data: data
      })
    }).catch(() => {
      reject({
        sukses: false,
        pesan: 'Gagal Memuat Data',
        data: []
      })
    })
  })

exports.edit = (data, id, changeImage) =>
  new Promise((resolve, reject) => {
    beritaController.updateOne({
      _id: objectId(id)
    }, data)
    .then(() => {
      if (changeImage) {
        deleteImage(data.oldImage)
      }
      resolve({
        sukses: true,
        pesan: 'Berhasil Mengubah Data'
      })
    }).catch(() => {
      reject({
        sukses: false,
        pesan: 'Gagal Mengubah Data'
      })
    })
  })

exports.tampilkanSatuData = (id) =>
  new Promise((resolve, reject) => {
    beritaController.findOne({
      _id: objectId(id)
    }).then(data => {
      resolve({
        data: data,
        sukses: true,
        pesan: 'Berhasil Memuat Data',
      })
    }).catch(error => reject({
      sukses: false,
      pesan: 'Gagal Memuat Data'
    }))
  })

exports.delete = (id) =>
  new Promise((resolve, reject) => {
    beritaController.findOne({
      _id: objectId(id)
    }).then(data => {
      beritaController.deleteOne({
        _id: objectId(id)
      }).then(() => {
        deleteImage(data.image)
          resolve({
          sukses: true,
          pesan: 'Berhasil Menghapus Data'
        })
      })
    }).catch(() => {
      reject({
        sukses: false,
        pesan: 'Gagal Menghapus Data'
      })
    })
  })

  exports.tampilkansemua = (tag) =>
  new Promise((resolve, reject) => {
    beritaController.find({
      tag: tag
    })
    .then(data => {
      resolve({
        sukses: true,
        pesan: 'Berhasil Memuat Data',
        data: data
      })
    }).catch(() => {
      reject({
        sukses: false,
        pesan: 'Gagal Memuat Data',
        data: []
      })
    })
  })