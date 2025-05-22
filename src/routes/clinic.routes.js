import { Router } from 'express';
import { ClinicController } from '../controllers/clinic.controller.js';

const clinicRoutes = Router();
const clinicController = new ClinicController();

clinicRoutes.get('/', clinicController.list);
clinicRoutes.post('/', clinicController.create);
clinicRoutes.get('/:id', clinicController.show);
clinicRoutes.put('/:id', clinicController.update);
clinicRoutes.delete('/:id', clinicController.delete);
clinicRoutes.patch('/:id/toggle-status', clinicController.toggleStatus);

export { clinicRoutes };