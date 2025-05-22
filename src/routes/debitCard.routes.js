import { Router } from 'express';
import { DebitCardController } from '../controllers/debitCard.controller.js';

const debitCardRoutes = Router();
const debitCardController = new DebitCardController();

debitCardRoutes.get('/', debitCardController.list);
debitCardRoutes.post('/', debitCardController.create);
debitCardRoutes.get('/:id', debitCardController.show);
debitCardRoutes.put('/:id', debitCardController.update);
debitCardRoutes.delete('/:id', debitCardController.delete);

export { debitCardRoutes };