import connection from '../models/connection';
import OrderModel from '../models/order.model';
// import { FullOrder, NewOrderFulfilled, NewOrder } from '../interfaces';
// import BadRequestHttpError from '../errors/httpErrors/BadRequest';
import NotFoundHttpError from '../errors/httpErrors/NotFound';

class OrderService {
  public orderModel: OrderModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
  }

  private async ensuresOrderExist(id: number) {
    const order = await this.orderModel.getById(id);

    if (!order) {
      const error = new NotFoundHttpError('Order not found');
      throw error;
    }

    return order;
  }

  public async getAll() {
    return this.orderModel.getAll();
  }

  public async getById(id: number) {
    return this.ensuresOrderExist(id);
  }

  // public async create(payload: NewOrder) {
  //   const orderExists = await this.orderModel.getById(payload.id);

  //   if (orderExists) {
  //     throw new BadRequestHttpError('Order already exists');
  //   }

  //   return this.orderModel.create(payload);
  // }

  public async remove(id: number) {
    await this.ensuresOrderExist(id);
    await this.orderModel.remove(id);
  }
}

export default OrderService;