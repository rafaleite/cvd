const Projeto = require('./projeto.model')
const categoriaBusiness = require('../categoria/categoria.business')
const mongoose = require('mongoose')
const querystring = require('query-string')
const ERRORS = require('../constants').ERRORS


/**
 * getCategorias  - Retorna JSON com todas as categorias
 * @returns {Array} - Array of users
 */
exports.getCategorias = async (ctx, next) => {
    try {
        const categorias = await Categoria.find({})
        const categoriasDTO = categorias.map(cat => montaCategoriaDTO(cat))
        ctx.status = 200
        ctx.body = { categorias: categoriasDTO }
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}

exports.newProjeto = async (ctx, next) => {
    try {
        let categoria = categoriaBusiness.findCategoriaById(ctx.request.body.categoria)
        if (categoria !== null) {
            ctx.status = 400
            ctx.body = { error: ERRORS.CATEGORIA_NAO_LOCALIZADA }
            return await next()
        }
        projeto = new Projeto({ nome: ctx.request.body.nome })

        categoria = await categoria.save()
        ctx.body = montaCategoriaDTO(categoria)
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}
