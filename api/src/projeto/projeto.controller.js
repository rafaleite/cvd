const projetoBusiness = require('./projeto.business')


/**
 * find  - Retorna JSON com todas os projetos
 * @returns {Array} - Array de projetos
 */
exports.find = async (ctx, next) => {
    try {
        const projetos = await projetoBusiness.find({})
        const dtos = projetos.map(obj => projetoBusiness.montarProjetoDTO(obj))
        ctx.status = 200
        ctx.body = { projetos: dtos }
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}

/**
 * findById  - Retorna JSON para um Projeto especifico
 * @returns {Object}  - Projeto
 */
exports.findById = async (ctx, next) => {
    try {
        const projeto = await projetoBusiness.findById(ctx.params.id, true)
        ctx.body = projetoBusiness.montarProjetoDTO(projeto)
        ctx.status = 200
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}


/**
 * Exemplo do Request:
 * {
 *     "nome": "RMIAtoritor",
 *     "versaoAtual": "1.0.0",
 *     "categoria": "5a6ab79273475c1e7dd56d17",
 *     "isDendencia": false,
 *     "dependencias": [
 *     {
 *         "projeto": "9a6ab56780475c1e7bd56d39",
 *         "versao": "1.0.0"
 *     }]
 * }
 *
 * create  - Retorna JSON com o projeto criado
 * @returns {Object} - Projeto
 */
exports.create = async (ctx, next) => {
    try {
        const projeto = await projetoBusiness.create(ctx.request.body)
        ctx.status = 200
        ctx.body = projetoBusiness.montarProjetoDTO(projeto)
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}


/**
 * Exemplo do Request:
 * {
 *     "nome": "RMIAtoritor",
 *     "versaoAtual": "1.0.0",
 *     "categoria": "5a6ab79273475c1e7dd56d17",
 *     "isDendencia": false,
 *     ""
 *     "dependencias": [
 *     {
 *         "projeto": "9a6ab56780475c1e7bd56d39",
 *         "versao": "1.0.0"
 *     }]
 * }
 *
 * create  - Retorna JSON com status
 * @returns {Object} - JSON com status de retorno
 */
exports.edit = async (ctx, next) => {
    try {
        projetoBusiness.edit(ctx.params.id, ctx.request.body)
        ctx.status = 200
        ctx.body = { status: 200, msg: 'Projeto alterado com sucesso' }
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}
