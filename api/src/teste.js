const mongoose = require('mongoose')
const Categoria = require('./categoria/categoria.model')
const Projeto = require('./projeto/projeto.model')

mongoose.connect('mongodb://localhost/teste')

const findCategoria = async (objectId) => {
    try {
        const id = new mongoose.mongo.ObjectID(objectId)
        const categoria = await Categoria.findById(id)
        console.log(categoria)
        return categoria
    } catch (err) {
        console.log(err)
        return ''
    }
}

const findCategorias = async (query, options) => {
    try {
        const categoria = await Categoria.paginate(query, options)
        console.log(categoria)
        return categoria
    } catch (err) {
        console.log(err)
        return ''
    }
}

const postCategoria = async (jsonCategoria) => {
    try {
        let categoria = await Categoria.findOne({ nome: jsonCategoria.nome })
        console.log(categoria)
        if (categoria !== null) {
            console.log('Categoria já cadastrada')
            return ''
        }
        categoria = new Categoria(jsonCategoria)
        const newCat = await categoria.save()
        console.log(newCat)
        return newCat
    } catch (err) {
        console.log(err)
        return ''
    }
}

const novoProjeto = async (projeto) => {
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
    }
}

const addVersao = async (req) => {
    try {
        
        if(req.versao === undefined || req.versao === '') {
            console.log('Versão não informada')
            return ''
        }
        
        const projeto = await Projeto.findById(req._id)
        if(projeto === null) {
            console.log('Projeto não localizado')
            return ''
        }

        if(req.isVersaoAtual) {
            projeto.versaoAtual = req.versao
        }

        projeto.versoes.push(req.versao)
        return await projeto.save()
    } catch (err) {
        console.log(err)
    }
}

// postCategoria({ nome: 'Projeto FRETE' })
// findCategoria('5a693d6343342e137d81a429').then(obj => findCategoria(obj._id))
findCategorias({nome: 'Projeto Benefício'}, { page: 1, limit: 1 })
const newProject = {
    nome: 'RMIAutorizador2',
    versaoAtual: '0010101',
    categoria: '5a693d6343342e137d81a429',
}

// novoProjeto(newProject)
