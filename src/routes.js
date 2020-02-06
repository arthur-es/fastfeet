import { Router } from 'express'

import SessionController from './app/controllers/SessionController'
import RecipientController from './app/controllers/RecipientController'
import authMiddleware from './app/middlewares/auth'
import logRequests from './app/middlewares/logRequests'

const routes = new Router()

routes.use(logRequests)

routes.get('/', async (req, res) => {

  return res.json({ message: "Hello there" })
})

routes.post('/sessions', SessionController.store)

routes.use(authMiddleware)

routes.post('/recipients', RecipientController.store)

//aqui pra baixo precisa passar pelo authmiddleware

export default routes;