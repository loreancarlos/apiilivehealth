import { Router } from 'express';
import { TagController } from '../controllers/tag.controller.js';

const tagRoutes = Router();
const tagController = new TagController();

tagRoutes.get('/', tagController.list);
tagRoutes.post('/', tagController.create);
tagRoutes.get('/:id', tagController.show);
tagRoutes.put('/:id', tagController.update);
tagRoutes.delete('/:id', tagController.delete);

export { tagRoutes };