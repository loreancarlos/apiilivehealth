import { Router } from 'express';
import { ProfessionalClinicPartnersController } from '../controllers/professionalClinicPartners.controller.js';
import { adminMiddleware } from '../middlewares/admin.middleware.js';
import { professionalMiddleware } from '../middlewares/professional.middleware.js';
import { clinicMiddleware } from '../middlewares/clinic.middleware.js';

const professionalClinicPartnersRoutes = Router();
const professionalClinicPartnersController = new ProfessionalClinicPartnersController();

professionalClinicPartnersRoutes.get('/', adminMiddleware, professionalClinicPartnersController.list);
professionalClinicPartnersRoutes.get('/clinics', professionalMiddleware, professionalClinicPartnersController.clinicsList);
professionalClinicPartnersRoutes.get('/professionals', clinicMiddleware, professionalClinicPartnersController.professionalsList);
professionalClinicPartnersRoutes.post('/', professionalClinicPartnersController.create);
professionalClinicPartnersRoutes.get('/:id', professionalClinicPartnersController.show);
professionalClinicPartnersRoutes.put('/:id', professionalClinicPartnersController.update);
professionalClinicPartnersRoutes.delete('/:id', professionalClinicPartnersController.delete);
professionalClinicPartnersRoutes.patch('/professional/respond/:id', professionalClinicPartnersController.professionalPartnershipResponse);
professionalClinicPartnersRoutes.patch('/clinic/respond/:id', professionalClinicPartnersController.clinicPartnershipResponse);
professionalClinicPartnersRoutes.patch('/:id/toggleStatus', professionalClinicPartnersController.toggleStatus);

export { professionalClinicPartnersRoutes };