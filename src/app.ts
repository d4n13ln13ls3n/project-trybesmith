import express from 'express';
import 'express-async-errors';

import errorHandlerMiddleware from './middlewares/error-handler.middleware';

import AuthenticationRouter from './routes/authentication.routes';
import UserRouter from './routes/user.routes';
import ProductRouter from './routes/product.routes';

const app = express();

app.use(express.json());

app.use('/auth', AuthenticationRouter);

app.use('/products', ProductRouter);

app.use('/users', UserRouter);

app.use(errorHandlerMiddleware);

export default app;
