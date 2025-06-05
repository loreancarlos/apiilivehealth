import { Router } from 'express';
import { ProfessionalController } from '../controllers/professional.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const professionalRoutes = Router();
const professionalController = new ProfessionalController();

professionalRoutes.get('/', professionalController.list);
professionalRoutes.post('/', professionalController.create);
professionalRoutes.get('/:id', professionalController.show);
professionalRoutes.put('/:id', authMiddleware, professionalController.update);
professionalRoutes.delete('/:id', authMiddleware, professionalController.delete);
professionalRoutes.patch('/:id/toggle-status', authMiddleware, professionalController.toggleStatus);

export { professionalRoutes };