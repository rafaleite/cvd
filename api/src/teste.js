const mongoose = require('mongoose')
const Categoria = require('./categoria/categoria.model')
mongoose.connect('mongodb://localhost/teste')

const postCategoria = async (jsonCategoria) => {
    try {
        let categoria = await Categoria.findOne({nome: jsonCategoria.nome})
        console.log(categoria)
        if(categoria !== null) {
            console.log('Categoria já cadastrada')
            return ""
        }else {
            categoria = new Categoria(jsonCategoria)
        }

        const newCat = await categoria.save()
        console.log(newCat)
    }catch(err) {
        console.log(err)
    }
}

postCategoria({nome: 'Projeto FRETE'})