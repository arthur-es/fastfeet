import multer from 'multer';
import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';
import logRequests from './app/middlewares/logRequests';

import multerConfig from './config/multer';
const upload = multer(multerConfig);

const routes = new Router();

routes.use(logRequests);

routes.get('/', async (req, res) => {
  return res.json({ message: 'Hello there' });
});

routes.post('/sessions', SessionController.store);

//aqui pra baixo precisa passar pelo authmiddleware
routes.use(authMiddleware);

routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);

routes.get('/deliverymen', DeliverymanController.index);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
