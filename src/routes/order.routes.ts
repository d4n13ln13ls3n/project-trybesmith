import { Router } from 'express';

import OrderController from '../controllers/order.controller';

import accessTokenValidatorMiddleware from '../middlewares/access-token-validator.middleware';

const router = Router();

const orderController = new OrderController();
// const loginController = new LoginController();

router.get('/', orderController.getAll);

router.post('/', accessTokenValidatorMiddleware, orderController.create);

router.delete('/:id', orderController.remove);

export default router;