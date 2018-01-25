const Router = require('koa-router')
const router = new Router({ prefix: '/categorias' })
const controller = require('../categoria/categoria.controller')

router.get('/', controller.getCategorias)
router.get('/:id', controller.getCategoria)
router.post('/', controller.newCategoria)
router.put('/', controller.editCategoria)
router.delete('/', controller.deleteCategoria)

module.exports = router