const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CategoriaSchema = new Schema({
    nome: { type: String, unique: true }
})

module.exports = mongoose.model('Categoria', CategoriaSchema);