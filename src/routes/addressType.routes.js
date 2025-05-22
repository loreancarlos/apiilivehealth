import { Router } from 'express';
import { AddressTypeController } from '../controllers/addressType.controller.js';

const addressTypeRoutes = Router();
const addressTypeController = new AddressTypeController();

addressTypeRoutes.get('/', addressTypeController.list);
addressTypeRoutes.post('/', addressTypeController.create);
addressTypeRoutes.get('/:id', addressTypeController.show);
addressTypeRoutes.put('/:id', addressTypeController.update);
addressTypeRoutes.delete('/:id', addressTypeController.delete);

export { addressTypeRoutes };