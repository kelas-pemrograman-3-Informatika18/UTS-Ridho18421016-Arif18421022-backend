const router = require('express').Router()
const beritaController = require('../controller/Berita')

router.post('/input', (req, res) => {
    beritaController.simpanKegiatan(req.body)
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.get('/tampil' ,(req, res) => {
    beritaController.tampilKegiatan()
    .then((result) => res.json(result))
    .catch((err) => res.json(err))
})

router.put('/edit/:id', (req, res) => {
    beritaController.edit(req.body, req.params.id)
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