import { Router } from 'express';

import OrderController from '../controllers/order.controller';

const router = Router();

const orderController = new OrderController();
// const loginController = new LoginController();

router.get('/', orderController.getAll);

// router.post('/', orderController.create);

router.delete('/:id', orderController.remove);

export default router;