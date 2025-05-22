import { Router } from 'express';
import { ProfessionalReviewController } from '../controllers/professionalReview.controller.js';

const professionalReviewRoutes = Router();
const professionalReviewController = new ProfessionalReviewController();

professionalReviewRoutes.get('/', professionalReviewController.list);
professionalReviewRoutes.post('/', professionalReviewController.create);
professionalReviewRoutes.get('/:id', professionalReviewController.show);
professionalReviewRoutes.put('/:id', professionalReviewController.update);
professionalReviewRoutes.delete('/:id', professionalReviewController.delete);

export { professionalReviewRoutes };