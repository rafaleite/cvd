const fs = require('fs')
const path = require('path')
const glob = require('glob')
const router = require('koa-router')({ prefix: '/api' })

glob(__dirname+'/**/*.route.js', function (er, files) {
    files.forEach(file => {
        const route = require(file)
        router.use(route.routes(), route.allowedMethods())
    }) 
})
module.exports = router
