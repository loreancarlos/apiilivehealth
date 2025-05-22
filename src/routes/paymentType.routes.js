import { Router } from 'express';
import { PaymentTypeController } from '../controllers/paymentType.controller.js';

const paymentTypeRoutes = Router();
const paymentTypeController = new PaymentTypeController();

paymentTypeRoutes.get('/', paymentTypeController.list);
paymentTypeRoutes.post('/', paymentTypeController.create);
paymentTypeRoutes.get('/:id', paymentTypeController.show);
paymentTypeRoutes.put('/:id', paymentTypeController.update);
paymentTypeRoutes.delete('/:id', paymentTypeController.delete);

export { paymentTypeRoutes };