const express = require('express')
const ProductController = require('../controllers/product')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/', ProductController.getProducts)
api.get('/:productId', ProductController.getProduct)
api.post('/', ProductController.saveProduct)
api.put('/:productId', ProductController.updateProduct)
api.delete('/:productId', ProductController.deleteProduct)
api.get('/private', auth.isAuth, function(req, res) {
    res.status(200).send({ message: 'Tienes acceso' })
})

module.exports = api