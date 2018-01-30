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

const addDependencia = async (request) => {
    const projeto = await Projeto.findById(request.id)
    if (projeto === null) {
        console.log('Projeto não localizado')
        return null
    }

    const dependencia = await Projeto.findById(request.dependencia.id)
    if (dependencia === null) {
        console.log('Dependencia não localizada')
        return null
    }

    if (!dependencia.versoes.includes(request.dependencia.versao)) {
        console.log('A versão da dependencia não existe')
        return null
    }

    projeto.dependencias.push({ projeto: dependencia._id, versao: request.dependencia.versao })
    console.log(projeto)
    await projeto.save()
    return { status: 200, msg: 'Dependencia incluída com sucesso' }
}

const findProjeto = async (objectId) => {
    try {
        const id = new mongoose.mongo.ObjectID(objectId)
        const projeto = await Projeto.findById(id).populate('categoria').populate('dependencias.projeto')
        console.log(projeto.dependencias[0].projeto)
        return projeto
    } catch (err) {
        console.log(err)
        return ''
    }
}

// postCategoria({ nome: 'Projeto FRETE' })
// findCategoria('5a693d6343342e137d81a429').then(obj => findCategoria(obj._id))
// findCategorias({nome: 'Projeto Benefício'}, { page: 1, limit: 1 })
const newProject = {
    nome: 'UnikAcid',
    versaoAtual: '1.0.0',
    categoria: '5a693d6343342e137d81a429',
}

const addDependenciaRequest = {
    id: '5a694db7d508a51704b2988e',
    dependencia: {
        id: '5a6fd4c60852934e6033800a',
        versao: '1.0.0',
    },
}
//addDependencia(addDependenciaRequest)
findProjeto('5a694db7d508a51704b2988e')
