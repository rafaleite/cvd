const Router = require('koa-router')
const controller = require('./projeto.controller')

const router = new Router()

router.get('projetos/', controller.getProjetos)
router.get('projeto/:id', controller.getProjeto)
router.post('projeto/', controller.create)
router.put('projeto/:id', controller.edit)
router.delete('projeto/:id', controller.remove)

module.exports = router
