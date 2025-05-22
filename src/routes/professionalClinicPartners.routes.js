import { Router } from 'express';
import { ProfessionalClinicPartnersController } from '../controllers/professionalClinicPartners.controller.js';

const professionalClinicPartnersRoutes = Router();
const professionalClinicPartnersController = new ProfessionalClinicPartnersController();

professionalClinicPartnersRoutes.get('/', professionalClinicPartnersController.list);
professionalClinicPartnersRoutes.post('/', professionalClinicPartnersController.create);
professionalClinicPartnersRoutes.get('/:id', professionalClinicPartnersController.show);
professionalClinicPartnersRoutes.put('/:id', professionalClinicPartnersController.update);
professionalClinicPartnersRoutes.delete('/:id', professionalClinicPartnersController.delete);
professionalClinicPartnersRoutes.patch('/:id/toggle-status', professionalClinicPartnersController.toggleStatus);

export { professionalClinicPartnersRoutes };