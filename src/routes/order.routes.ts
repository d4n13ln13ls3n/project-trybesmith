import { Router } from 'express';

import OrderController from '../controllers/order.controller';

import accessTokenValidatorMiddleware from '../middlewares/access-token-validator.middleware';

import validateBody from '../middlewares/order.middleware';

const router = Router();

const orderController = new OrderController();
// const loginController = new LoginController();

router.get('/', orderController.getAll);

router.post(
  '/', 
  accessTokenValidatorMiddleware, 
  validateBody, 
  orderController.create,
);

router.delete('/:id', orderController.remove);

export default router;