const Categoria = require('./categoria.model')
const Projeto = require('../projeto/projeto.model')
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

/**
 * getCategoria  - Retorna JSON para uma Categoria especifica
 * @returns {Object}  - Categoria objeto
 */
exports.getCategoria = async (ctx, next) => {
    try {
        const _id = new mongoose.mongo.ObjectID(ctx.params.id)
        const categoria = await Categoria.findById(_id)
        const categoriaDTO = montaCategoriaDTO(categoria)
        
        ctx.body = categoriaDTO
        ctx.status = 200
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}

exports.newCategoria = async (ctx, next) => {
    try {
        let categoria = await Categoria.findOne({ nome: ctx.request.body.nome })
        if (categoria !== null) {
            ctx.status = 422
            ctx.body = { error: ERRORS.CATEGORIA_EXISTE }
            return await next()
        }
        categoria = new Categoria({ nome: ctx.request.body.nome })
        categoria = await categoria.save() 
        ctx.body = montaCategoriaDTO(categoria)
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}

/**
 * editCategoria  - Edita a categoria
 */
exports.editCategoria = async (ctx, next) => {
    try {
        const _id = new mongoose.mongo.ObjectID(ctx.params.id)
        const categoriaExist = await Categoria.findOne({ nome: ctx.request.body.nome, _id: {$ne: _id} })
        if(categoriaExist !== null) {
            ctx.status = 422
            ctx.body = { error: ERRORS.CATEGORIA_EXISTE }
            return await next()
        }

        await Categoria.findOneAndUpdate({ _id: ctx.params.id }, { nome: ctx.request.body.nome });
        ctx.status = 200
        ctx.body = { msg: 'Categoria alterada com sucesso', status: 200 }
        await next();
    } catch (err) {
        ctx.throw(500, err)
    }
}

/**
 * deleteCategoria  - Apaga uma categoria
 */
exports.deleteCategoria = async (ctx, next) => {
    try {
        const _id = new mongoose.mongo.ObjectID(ctx.params.id)
        const projetos = await Projeto.find({ categoria : _id })
        
        if(projetos !== null && projetos.length > 0) {
            ctx.status = 400
            ctx.body = { error: 'Existem projetos vinculados a categoria', status: 400 }
            return await next()
        }

        await Categoria.findOneAndRemove({ _id: ctx.params.id });
        ctx.status = 200
        ctx.body = { msg: 'Categoria apagada com sucesso!', status: 200 }
        await next()
    } catch (err) {
        ctx.throw(500, err)
    }
}

montaCategoriaDTO = (categoria) => {
    if(categoria === null || categoria === undefined) {
        return {}
    }
    return { id: categoria._id, nome: categoria.nome }
}