const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate')

const Schema = mongoose.Schema

const CategoriaSchema = new Schema({
    nome: { type: String, unique: true },
})

CategoriaSchema.plugin(mongoosePaginate)

module.exports = mongoose.model('Categoria', CategoriaSchema)
