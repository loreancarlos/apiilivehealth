import { Router } from 'express';
import { ClinicReviewController } from '../controllers/clinicReview.controller.js';

const clinicReviewRoutes = Router();
const clinicReviewController = new ClinicReviewController();

clinicReviewRoutes.get('/', clinicReviewController.list);
clinicReviewRoutes.post('/', clinicReviewController.create);
clinicReviewRoutes.get('/:id', clinicReviewController.show);
clinicReviewRoutes.put('/:id', clinicReviewController.update);
clinicReviewRoutes.delete('/:id', clinicReviewController.delete);

export { clinicReviewRoutes };