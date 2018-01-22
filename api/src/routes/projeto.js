const Router = require('koa-router')

const router = new Router({ prefix: '/projetos' })

router.get('/', async (ctx, next) => {
    ctx.status = 200
    ctx.body = { nome: 'Teste de rota' }
    await next()
})

module.exports = router