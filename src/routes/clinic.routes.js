import { Router } from 'express';
import { ClinicController } from '../controllers/clinic.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const clinicRoutes = Router();
const clinicController = new ClinicController();

clinicRoutes.get('/', clinicController.list);
clinicRoutes.post('/', clinicController.create);
clinicRoutes.get('/:id', clinicController.show);
clinicRoutes.put('/:id', authMiddleware, clinicController.update);
clinicRoutes.delete('/:id', authMiddleware, clinicController.delete);
clinicRoutes.patch('/:id/toggle-status', authMiddleware, clinicController.toggleStatus);

export { clinicRoutes };