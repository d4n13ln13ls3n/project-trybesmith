import { Request, Response } from 'express';
import NotFoundHttpError from '../errors/httpErrors/NotFound';
// import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';
import { NewOrderRequestBody } from '../interfaces';

import OrderService from '../services/order.service';

class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  public getAll = async (req: Request, res: Response) => {
    const orders = await this.orderService.getAll();
    res.status(200).json(orders);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params; // estava com PARSEINT antes
    const order = await this.orderService.getById(Number(id));
    res.status(200).json(order);
  };

  public create = async (req: Request, res: Response) => {
    const body = req.body as NewOrderRequestBody;
    // if (!req.user) {
    //   throw new UnauthorizedHttpError;
    // }
    const { user } = req;
    if (!user) {
      throw new NotFoundHttpError('User not found');
    }
    
    const order = await this.orderService.create({ 
      productsIds: body.productsIds, userId: user.id,
    });
    return res.status(201).json(order);
  };

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.orderService.remove(id);
    res.status(204).send();
  };
}

export default OrderController;