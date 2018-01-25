module.exports = () => {
    const dbConfig = {
        url: 'mongodb://localhost:27017/cvd-dev',
        opts: {
            autoReconnect: true,
            keepAlive: 300000,
        },
    }

    switch (process.env.NODE_ENV) {
    case 'production':
        Object.assign(dbConfig, { url: 'mongodb://localhost:27017/cvd' })
        break
    case 'stage':
        break
    case 'test':
        Object.assign(dbConfig, { url: 'mongodb://localhost:27017/cvd-test' })
        break
    case 'dev':
    default:
        break
    }

    return dbConfig
}
