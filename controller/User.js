const userModel = require('../model/User')
const bcrypt = require('bcryptjs')

exports.register = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then(user => {
      if (user) {
      reject({
        sukses: false,
        pesan: 'Username Telah Terdaftar'
      })
    } else {
      bcrypt.hash(data.password, 10, (err, hash) => {
        data.password = hash
        userModel.create(data)
        .then (() => {
          resolve({
            sukses: true,
            pesan: 'Berhasil register'
          })
        }).catch(() => {
          reject({
            sukses: false,
            pesan: 'Gagal register'
          })
        })
      })
    }
  })
})

exports.login = (data) =>
  new Promise((resolve, reject) => {
    userModel.findOne({
      username: data.username
    }).then((user) => {
      if (user) {
        if (bcrypt.compareSync(data.password , user.password)) {
          resolve({
            sukses: true,
            pesan: 'Berhasil Login',
            data: user
          })
        } else {
          reject({
            sukses: false,
            pesan: 'Password Salah'
          })
        }
      } else {
        reject({
          sukses: false,
          pesan: 'Username tidak terdaftar'
        })
      }
    })
  })
