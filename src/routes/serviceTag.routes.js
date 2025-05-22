import { Router } from 'express';
import { ServiceTagController } from '../controllers/serviceTag.controller.js';

const serviceTagRoutes = Router();
const serviceTagController = new ServiceTagController();

serviceTagRoutes.get('/', serviceTagController.list);
serviceTagRoutes.post('/', serviceTagController.create);
serviceTagRoutes.get('/:id', serviceTagController.show);
serviceTagRoutes.put('/:id', serviceTagController.update);
serviceTagRoutes.delete('/:id', serviceTagController.delete);

export { serviceTagRoutes };