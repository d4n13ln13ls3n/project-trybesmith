import { Router } from 'express';

import userMiddleware from '../middlewares/user.middleware';
import UserController from '../controllers/user.controller';
import accessTokenValidatorMiddleware from '../middlewares/access-token-validator.middleware';

const router = Router();

const userController = new UserController();

router.post(
  '/',
  accessTokenValidatorMiddleware,
  userMiddleware,
  userController.create,
);

router.get('/', accessTokenValidatorMiddleware, userController.getAll);

router.get('/:id', accessTokenValidatorMiddleware, userController.getById);

router.put(
  '/:id',
  accessTokenValidatorMiddleware,
  userMiddleware,
  userController.update,
);

router.delete('/:id', accessTokenValidatorMiddleware, userController.remove);

export default router;