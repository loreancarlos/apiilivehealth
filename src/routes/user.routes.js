import { Router } from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const userRoutes = Router();
const userController = new UserController();

userRoutes.get('/', authMiddleware, userController.list);
userRoutes.post('/', userController.create);
userRoutes.get('/:id', authMiddleware, userController.show);
userRoutes.put('/:id', authMiddleware, userController.update);
userRoutes.delete('/:id', authMiddleware, userController.delete);
userRoutes.patch('/:id/toggle-status', authMiddleware, userController.toggleStatus);

export { userRoutes };