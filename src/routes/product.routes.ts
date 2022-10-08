import { Router } from 'express';

// import productMiddleware from '../middlewares/product.middleware';
import validateBody from '../middlewares/product.middleware';
import ProductController from '../controllers/product.controller';
import accessTokenValidatorMiddleware from '../middlewares/access-token-validator.middleware';

const router = Router();

const productController = new ProductController();

router.post('/', validateBody, productController.create);

router.get('/', productController.getAll);

router.get('/:id', accessTokenValidatorMiddleware, productController.getById);

router.put(
  '/:id',
  accessTokenValidatorMiddleware,
  validateBody,
  productController.update,
);

router.delete('/:id', accessTokenValidatorMiddleware, productController.remove);

export default router;