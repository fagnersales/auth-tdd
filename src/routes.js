const routes = require('express').Router()

const sessionControlelr = require('./controllers/SessionController')

routes.post('/sessions', sessionControlelr.store)

module.exports = routes