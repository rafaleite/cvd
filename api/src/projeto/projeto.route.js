const Router = require('koa-router')
const querystring = require('query-string')

const router = new Router({ prefix: '/projetos' })

router.get('/', async (ctx, next) => {
    ctx.status = 200
    ctx.body = { nome: 'Teste de rota' }
    console.log(querystring.parse(ctx.request.querystring))
    await next()
})

module.exports = router