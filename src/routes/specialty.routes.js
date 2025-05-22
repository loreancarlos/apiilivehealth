import { Router } from 'express';
import { SpecialtyController } from '../controllers/specialty.controller.js';

const specialtyRoutes = Router();
const specialtyController = new SpecialtyController();

specialtyRoutes.get('/', specialtyController.list);
specialtyRoutes.post('/', specialtyController.create);
specialtyRoutes.get('/:id', specialtyController.show);
specialtyRoutes.put('/:id', specialtyController.update);
specialtyRoutes.delete('/:id', specialtyController.delete);

export { specialtyRoutes };