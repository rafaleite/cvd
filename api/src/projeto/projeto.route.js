const Router = require('koa-router')
const controller = require('./projeto.controller')

const router = new Router()

router.get('projetos/', controller.find)
router.get('projeto/:id', controller.findById)
router.post('projeto/', controller.create)
router.put('projeto/:id', controller.edit)
// router.delete('projeto/:id', controller.remove)

module.exports = router
