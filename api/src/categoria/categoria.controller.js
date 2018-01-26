const Categoria = require('./categoria.model')
const querystring = require('query-string')
const ERRORS = require('../constants').ERRORS

/**
 * getCategorias  - Retorna JSON com todas as categorias
 * @returns {Array} - Array of users
 */
exports.getCategorias = async (ctx, next) => {
    try {
        const categorias = await Categoria.find({})
        const categoriasDTO = categorias.map(cat => ({ id: cat._id, nome: cat.nome }))
        ctx.status = 200
        ctx.body = { categorias: categoriasDTO }
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}

/**
 * getCategoria  - Retorna JSON para uma Categoria especifica
 * @returns {Object}  - Categoria objeto
 */
exports.getCategoria = async (ctx, next) => {
    try {

    } catch (err) {
        ctx.throw(500, err)
    }
}

exports.newCategoria = async (ctx, next) => {
    try {
        let categoria = await Categoria.findOne({ nome: ctx.request.body.nome })
        console.log(categoria)
        if (categoria !== null) {
            console.log('passou aqui')
            ctx.status = 422
            ctx.body = { error: ERRORS.CATEGORIA_EXISTE }
            return await next()
        }
        console.log('passou aqui de fora')
        categoria = new Categoria({ nome: ctx.request.body.nome })
        ctx.body = await categoria.save()
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}

exports.editCategoria = async (ctx, next) => {
    try {

    } catch (err) {
        ctx.throw(500, err)
    }
}

exports.deleteCategoria = async (ctx, next) => {
    try {

    } catch (err) {
        ctx.throw(500, err)
    }
}
