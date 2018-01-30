const Projeto = require('./projeto.model')
const mongoose = require('mongoose')

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

const newProjeto = async (projeto) => {
    try {
        const categoria = await findCategoria(projeto.categoria)
        if (categoria === null) {
            console.log('Categoria não localizada')
            return ''
        }
        const novoProjeto = new Projeto(projeto)
        novoProjeto.versoes.push(novoProjeto.versaoAtual)
        novoProjeto.categoria = categoria

        const objetoSalvo = await novoProjeto.save()
        console.log(objetoSalvo)
    } catch (err) {
        console.log(err)
        throw err
    }
}


module.exports = { montarProjetoDTO, findProjetoById, findProjeto }
