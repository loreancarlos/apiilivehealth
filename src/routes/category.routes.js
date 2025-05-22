import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller.js';

const categoryRoutes = Router();
const categoryController = new CategoryController();

categoryRoutes.get('/', categoryController.list);
categoryRoutes.post('/', categoryController.create);
categoryRoutes.get('/:id', categoryController.show);
categoryRoutes.put('/:id', categoryController.update);
categoryRoutes.delete('/:id', categoryController.delete);

export { categoryRoutes };