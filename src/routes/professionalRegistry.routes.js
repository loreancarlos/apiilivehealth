import { Router } from 'express';
import { ProfessionalRegistryController } from '../controllers/professionalRegistry.controller.js';

const professionalRegistryRoutes = Router();
const professionalRegistryController = new ProfessionalRegistryController();

professionalRegistryRoutes.get('/', professionalRegistryController.list);
professionalRegistryRoutes.post('/', professionalRegistryController.create);
professionalRegistryRoutes.get('/:id', professionalRegistryController.show);
professionalRegistryRoutes.put('/:id', professionalRegistryController.update);
professionalRegistryRoutes.delete('/:id', professionalRegistryController.delete);

export { professionalRegistryRoutes };