import { Router } from 'express';
import { DependentController } from '../controllers/dependent.controller.js';

const dependentRoutes = Router();
const dependentController = new DependentController();

dependentRoutes.get('/', dependentController.list);
dependentRoutes.post('/', dependentController.create);
dependentRoutes.get('/:id', dependentController.show);
dependentRoutes.put('/:id', dependentController.update);
dependentRoutes.delete('/:id', dependentController.delete);

export { dependentRoutes };