const router = require('express').Router()
const beritaController = require('../controller/Berita')
const uploadSetting = require('../uploadConfig')
const fields = uploadSetting.upload.fields([
  {
    name: 'image',
    maxCount: 1
  }
])

router.post('/input', fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])
  
  const data = Object.assign(JSON.parse(req.body.data), {
    image: imageName
  })
  beritaController.simpanKegiatan(data)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.get('/tampil' ,(req, res) => {
  beritaController.tampilKegiatan()
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.put('/edit/:id', fields, (req, res) => {
  const imageName = uploadSetting.cekNull(req.files['image'])

  let data = JSON.parse(req.body.data)
  let changeImage = false
  if (imageName) {
    changeImage = true
    data = Object.assign(data, {
      image: imageName,
      oldImage: data.image
    })
  }

  beritaController.edit(data, req.params.id, changeImage)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/tampilsingle/:id', (req, res) => {
  beritaController.tampilkanSatuData(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

router.get('/tampilsemua/:tag' ,(req, res) => {
  beritaController.tampilkansemua(req.params.tag)
  .then((result) => res.json(result))
  .catch((err) => res.json(err))
})

router.delete('/delete/:id', (req, res) => {
  beritaController.delete(req.params.id)
  .then(result => res.json(result))
  .catch(err => res.json(err))
})

module.exports = router