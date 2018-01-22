const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ProjetoSchema = new Schema({
    nome: { type: String, unique: true },
    versaoAtual: []
})

module.exports = mongoose.model('Projeto', ProjetoSchema);