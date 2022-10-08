import connection from '../models/connection';
import ProductModel from '../models/product.model';
import { CreateProductRequestBody, ProductRequestBodyWithOrderId } from '../interfaces';
import BadRequestHttpError from '../errors/httpErrors/BadRequest';
import NotFoundHttpError from '../errors/httpErrors/NotFound';

class ProductService {
  public productModel: ProductModel;

  constructor() {
    this.productModel = new ProductModel(connection);
  }

  private async ensuresProductExist(id: number) {
    const product = await this.productModel.getById(id);

    if (!product) {
      const error = new NotFoundHttpError('Product not found');
      throw error;
    }

    return product;
  }

  public async getAll() {
    return this.productModel.getAll();
  }

  public async getById(id: number) {
    return this.ensuresProductExist(id);
  }

  public async create(payload: CreateProductRequestBody) {
    const productExists = await this.productModel.getByName(payload.name);

    if (productExists) {
      throw new BadRequestHttpError('Product already exists');
    }

    return this.productModel.create(payload);
  }

  public async update(id: number, product: ProductRequestBodyWithOrderId) {
    await this.ensuresProductExist(id);
    return this.productModel.update(id, product);
  }

  public async remove(id: number) {
    await this.ensuresProductExist(id);
    await this.productModel.remove(id);
  }

  public async partialUpdate(
    id: number,
    patch: CreateProductRequestBody,
  ): Promise<void> {
    await this.ensuresProductExist(id);
    await this.productModel.partialUpdate(id, patch);
  }
}

export default ProductService;