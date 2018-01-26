const Router = require('koa-router')
const controller = require('../categoria/categoria.controller')

const router = new Router({ prefix: '/categorias' })

router.get('/', controller.getCategorias)
router.get('/:id', controller.getCategoria)
router.post('/', controller.newCategoria)
router.put('/', controller.editCategoria)
router.delete('/', controller.deleteCategoria)

module.exports = router
