import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', userController.list);
userRoutes.post('/', userController.create);
userRoutes.get('/:id', userController.show);
userRoutes.put('/:id', userController.update);
userRoutes.delete('/:id', userController.delete);
userRoutes.patch('/:id/toggle-status', userController.toggleStatus);

export { userRoutes };