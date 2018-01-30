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
