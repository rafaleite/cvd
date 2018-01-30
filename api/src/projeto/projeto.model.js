const mongoose = require('mongoose')
const idValidator = require('mongoose-id-validator')

const Schema = mongoose.Schema
const ProjetoSchema = new Schema({
    nome: { type: String, unique: true },
    versaoAtual: { type: String, required: true },
    versoes: [String],
    categoria: { type: Schema.ObjectId, ref: 'Categoria', required: true },
    dependencias: [{
        _id: false,
        projeto: { type: Schema.ObjectId, ref: 'Projeto' },
        versao: String,
    }],
    isDependencia: { type: Boolean, default: true },
})

const ProjetoModel = mongoose.model('Projeto', ProjetoSchema)
ProjetoSchema.plugin(idValidator, { message: '{PATH} não localizado' })
module.exports = ProjetoModel
