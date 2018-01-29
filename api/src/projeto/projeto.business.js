const Projeto = require('./projeto.model')
const categoriaBusiness = require('../categoria/categoria.business')
const mongoose = require('mongoose')

const montarProjetoDTO = (projeto) => {
    if (projeto === null || projeto === undefined) {
        return {}
    }

    const dto = {
        nome: projeto.nome,
        versaoAtual: projeto.versaoAtual,
        versoes: projeto.versoes,
        categoria: categoriaBusiness.findCategoriaById(projeto.categoria, true),
        dependencias: montarDependenciasDTO(projeto.dependencias),
        isPublicado: projeto.isPublicado,
    }
}

const montarDependenciasDTO = (dependencias) => {
    
}