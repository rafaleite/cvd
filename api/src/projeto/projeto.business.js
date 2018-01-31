const Projeto = require('./projeto.model')
const categoriaBusiness = require('../categoria/categoria.business')
const mongoose = require('mongoose')
const ERRORS = require('../constants').ERRORS

const montarDependenciasDTO = dependencias => dependencias.map(dep => ({ nome: dep.projeto.nome, versao: dep.versao }))

const montarProjetoDTO = (projeto) => {
    if (projeto === null || projeto === undefined) {
        return {}
    }

    const dto = {
        id: projeto._id,
        nome: projeto.nome,
        versaoAtual: projeto.versaoAtual,
        versoes: projeto.versoes,
        categoria: { id: projeto.categoria._id, nome: projeto.categoria.nome },
        dependencias: montarDependenciasDTO(projeto.dependencias),
        isPublicado: projeto.isPublicado,
    }

    return dto
}

const findProjetoById = async (id) => {
    try {
        const _id = new mongoose.mongo.ObjectID(id)
        return await Projeto.findById(_id).populate('categoria').populate('dependencias.projeto')
    } catch (err) {
        console.log(err)
        throw err
    }
}

const findProjeto = async (query) => {
    try {
        const projetos = await Projeto.find(query).populate('categoria').populate('dependencias.projeto')
        return projetos
    } catch (err) {
        console.log(err)
        throw err
    }
}

const create = async (projeto) => {
    try {
        const categoria = categoriaBusiness.findCategoriaById(projeto.categoria)
        if (categoria === null) {
            const error = new Error(ERRORS.CATEGORIA_NAO_LOCALIZADA)
            error.code = 400
            throw error
        }
        const novoProjeto = new Projeto(projeto)
        novoProjeto.versoes.push(novoProjeto.versaoAtual)
        novoProjeto.categoria = categoria

        return await novoProjeto.save()
    } catch (err) {
        throw err
    }
}

const update = async (projeto) => {

}

const remove = async (id) => {

}

module.exports = { montarProjetoDTO, findProjetoById, findProjeto }
