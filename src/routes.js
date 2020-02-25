import multer from 'multer';
import { Router } from 'express';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliverymanActionController from './app/controllers/DeliverymanActionController';
import PackageWithdrawController from './app/controllers/PackageWithdrawController';
import PackageDeliverController from './app/controllers/PackageDeliverController';
import FileController from './app/controllers/FileController';
import PackageController from './app/controllers/PackageController';
import PackageProblemController from './app/controllers/PackageProblemController';
import PackageProblemsDistributorController from './app/controllers/PackageProblemsDistributorController';

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
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);
routes.get('/deliveryman/:id/deliveries', DeliverymanActionController.index);
routes.post(
  '/deliveryman/:id/deliveries/:packageId/withdraw',
  PackageWithdrawController.update
);

routes.post(
  '/deliveryman/:id/deliveries/:packageId/deliver',
  PackageDeliverController.update
);

routes.get('/packages', PackageController.index);
routes.post('/packages', PackageController.store);
routes.put('/packages/:id', PackageController.update);
routes.delete('/packages/:id', PackageController.delete);

routes.get('/package/:packageId/problems', PackageProblemController.index);
routes.post('/package/:packageId/problems', PackageProblemController.store);

routes.get('/packages/problems', PackageProblemsDistributorController.index);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
