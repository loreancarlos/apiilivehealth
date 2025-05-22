import { Router } from 'express';
import { RegistryController } from '../controllers/registry.controller.js';

const registryRoutes = Router();
const registryController = new RegistryController();

registryRoutes.get('/', registryController.list);
registryRoutes.post('/', registryController.create);
registryRoutes.get('/:id', registryController.show);
registryRoutes.put('/:id', registryController.update);
registryRoutes.delete('/:id', registryController.delete);

export { registryRoutes };