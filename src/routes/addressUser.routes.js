import { Router } from 'express';
import { AddressUserController } from '../controllers/addressUser.controller.js';

const addressUserRoutes = Router();
const addressUserController = new AddressUserController();

addressUserRoutes.get('/', addressUserController.list);
addressUserRoutes.post('/', addressUserController.create);
addressUserRoutes.get('/:id', addressUserController.show);
addressUserRoutes.put('/:id', addressUserController.update);
addressUserRoutes.delete('/:id', addressUserController.delete);

export { addressUserRoutes };