const Router = require('koa-router')
const controller = require('../categoria/categoria.controller')

const router = new Router({ prefix: '/categorias' })

router.get('/', controller.getCategorias)
router.get('/:id', controller.getCategoria)
router.post('/', controller.newCategoria)
router.put('/:id', controller.editCategoria)
router.delete('/:id', controller.deleteCategoria)

module.exports = router
