import { Router } from 'express';

import userMiddleware from '../middlewares/user.middleware';
import UserController from '../controllers/user.controller';
import accessTokenValidatorMiddleware from '../middlewares/access-token-validator.middleware';
// import LoginController from '../controllers/login.controller';
// import AuthenticationController from '../controllers/authentication.controller';

const router = Router();

const userController = new UserController();
// const loginController = new LoginController();

router.post('/', userMiddleware, userController.create);

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