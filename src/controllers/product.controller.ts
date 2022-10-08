import { Request, Response } from 'express';

import { CreateProductRequestBody, ProductRequestBodyWithOrderId } from '../interfaces';
import ProductService from '../services/product.service';

class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  public getAll = async (req: Request, res: Response) => {
    const products = await this.productService.getAll();
    res.status(200).json(products);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params; // estava com PARSEINT antes
    const product = await this.productService.getById(Number(id));
    res.status(200).json(product);
  };

  public create = async (req: Request, res: Response) => {
    const product = await this.productService.create(
      req.body as CreateProductRequestBody,
    );
    return res.status(201).json(product);
  };

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const product = await this.productService.update(
      id,
      req.body as ProductRequestBodyWithOrderId,
    );
    res.status(200).json(product);
  };

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.productService.remove(id);
    res.status(204).send();
  };
}

export default ProductController;