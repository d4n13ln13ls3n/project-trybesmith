import connection from '../models/connection';
import OrderModel from '../models/order.model';
import { NewOrderPayload } from '../interfaces';
import BadRequestHttpError from '../errors/httpErrors/BadRequest';
import NotFoundHttpError from '../errors/httpErrors/NotFound';
import ProductModel from '../models/product.model';

class OrderService {
  public orderModel: OrderModel;

  public productModel: ProductModel;

  constructor() {
    this.orderModel = new OrderModel(connection);
    this.productModel = new ProductModel(connection);
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

  public async create(payload: NewOrderPayload) {
    const { productsIds } = payload;
    
    const products = await Promise.all(
      productsIds.map(async (productId) => this.productModel.getById(productId)),
    );

    const invalidProductId = products.some((product) => !product);

    if (invalidProductId) {
      throw new BadRequestHttpError('product does not exist');
    }

    return this.orderModel.create(payload);
  }

  public async remove(id: number) {
    await this.ensuresOrderExist(id);
    await this.orderModel.remove(id);
  }
}

export default OrderService;