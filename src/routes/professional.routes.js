import { Router } from 'express';
import { ProfessionalController } from '../controllers/professional.controller.js';

const professionalRoutes = Router();
const professionalController = new ProfessionalController();

professionalRoutes.get('/', professionalController.list);
professionalRoutes.post('/', professionalController.create);
professionalRoutes.get('/:id', professionalController.show);
professionalRoutes.put('/:id', professionalController.update);
professionalRoutes.delete('/:id', professionalController.delete);
professionalRoutes.patch('/:id/toggle-status', professionalController.toggleStatus);

export { professionalRoutes };