import { Router } from 'express';
import { CreditCardController } from '../controllers/creditCard.controller.js';

const creditCardRoutes = Router();
const creditCardController = new CreditCardController();

creditCardRoutes.get('/', creditCardController.list);
creditCardRoutes.post('/', creditCardController.create);
creditCardRoutes.get('/:id', creditCardController.show);
creditCardRoutes.put('/:id', creditCardController.update);
creditCardRoutes.delete('/:id', creditCardController.delete);

export { creditCardRoutes };