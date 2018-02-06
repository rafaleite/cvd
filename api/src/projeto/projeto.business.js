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

const validaCategoria = async (idCategoria) => {
    const categoria = categoriaBusiness.findCategoriaById(idCategoria)
    if (categoria === null) {
        const error = new Error(ERRORS.CATEGORIA_NAO_LOCALIZADA)
        error.code = 400
        throw error
    }
}

const create = async (projeto) => {
    try {
        await validaCategoria(projeto.categoria)
        const novoProjeto = new Projeto(projeto)
        novoProjeto.versoes.push(novoProjeto.versaoAtual)
        novoProjeto.categoria = projeto.categoria
        return await novoProjeto.save()
    } catch (err) {
        throw err
    }
}

const edit = async (id, projeto) => {
    const _id = new mongoose.mongo.ObjectID(id)

    const projetoExist = await Projeto.findOne({ nome: projeto.nome, _id: { $ne: _id } })
    if (projetoExist !== null) {
        return { error: ERRORS.PROJETO_MESMO_NOME, status: 422 }
    }

    await Projeto.findOneAndUpdate({ _id }, projeto)
    return { msg: 'Categoria alterada com sucesso', status: 200 }
}

const remove = async (id) => {
    try {
        const busca = await Projeto.find({ 'dependencias.projeto': mongoose.Types.ObjectId(id) })
        if (busca !== null) {
            return { error: ERRORS.PROJETO_DEPENDENCIA, status: 400 }
        }
        await Projeto.findOneAndRemove({ _id: mongoose.Types.ObjectId(id) })
        return { msg: 'Categoria apagada com sucesso!', status: 200 }
    } catch (err) {
        throw err
    }
}

module.exports = {
    montarProjetoDTO,
    create,
    edit,
    remove,
    findProjetoById,
    findProjeto,
}
