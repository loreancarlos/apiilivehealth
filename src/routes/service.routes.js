import { Router } from 'express';
import { ServiceController } from '../controllers/service.controller.js';

const serviceRoutes = Router();
const serviceController = new ServiceController();

serviceRoutes.get('/', serviceController.list);
serviceRoutes.post('/', serviceController.create);
serviceRoutes.get('/:id', serviceController.show);
serviceRoutes.put('/:id', serviceController.update);
serviceRoutes.delete('/:id', serviceController.delete);
serviceRoutes.patch('/:id/toggleIsPromotionOn', serviceController.togglePromotion);
serviceRoutes.patch('/:id/toggleStatus', serviceController.toggleServiceStatus);
export { serviceRoutes };