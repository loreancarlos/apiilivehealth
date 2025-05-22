import { Router } from 'express';
import { ProfessionalSpecialtyController } from '../controllers/professionalSpecialty.controller.js';

const professionalSpecialtyRoutes = Router();
const professionalSpecialtyController = new ProfessionalSpecialtyController();

professionalSpecialtyRoutes.get('/', professionalSpecialtyController.list);
professionalSpecialtyRoutes.post('/', professionalSpecialtyController.create);
professionalSpecialtyRoutes.get('/:id', professionalSpecialtyController.show);
professionalSpecialtyRoutes.put('/:id', professionalSpecialtyController.update);
professionalSpecialtyRoutes.delete('/:id', professionalSpecialtyController.delete);

export { professionalSpecialtyRoutes };