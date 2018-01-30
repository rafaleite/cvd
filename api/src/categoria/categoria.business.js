const Categoria = require('./categoria.model')
const mongoose = require('mongoose')

const montarCategoriaDTO = (categoria) => {
    try {
        if (categoria === null || categoria === undefined) {
            return {}
        }
        return { id: categoria._id, nome: categoria.nome }
    } catch (err) {
        throw err
    }
}

const findCategoriaById = async (id, isDTOFormat) => {
    try {
        const _id = new mongoose.mongo.ObjectID(id)
        const categoria = await Categoria.findById(_id)

        if (isDTOFormat) {
            return montarCategoriaDTO(categoria)
        }
        return categoria
    } catch (err) {
        throw err
    }
}

const findCategorias = async (query, isDTOFormat) => {
    try {
        const categorias = await Categoria.find(query)
        console.log(categorias)
        if (isDTOFormat) {
            return categorias.map(cat => montarCategoriaDTO(cat))
        }
        return categorias
    } catch (err) {
        throw err
    }
}

module.exports = { montarCategoriaDTO, findCategoriaById, findCategorias }
