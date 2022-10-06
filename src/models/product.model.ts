import { Pool, ResultSetHeader } from 'mysql2/promise';

import { CreateProductRequestBody, Product } from '../interfaces';

export default class ProductModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Product[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products');
    const [rows] = result;
    return rows as Product[];
  }

  public async getById(id: number): Promise<Product | null> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products WHERE id=?', [id]);
    const [rows] = result;
    const [product] = rows as Product[];
    return product || null;
  }

  public async getByName(name: string): Promise<Product | null> { // REVISAR
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Products WHERE name = ?', [name]);
    const [rows] = result;
    const [product] = rows as Product[];

    return product || null;
  }

  public async create(product: CreateProductRequestBody): Promise<Product> {
    const { name, amount } = product;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Products (name, amount) VALUES (?, ?)',
      [name, amount],
    );

    const [dataInserted] = result;
    const { insertId: id } = dataInserted;
    return { id, ...product };
  }

  public async update(id: number, product: CreateProductRequestBody): Promise<Product> {
    const { name, amount, orderId } = product;
    await this.connection.execute(
      'UPDATE Trybesmith.Products SET name = ?, amount = ?, orderId = ? WHERE id = ?',
      [name, amount, orderId, id],
    );

    const editedProduct: Product = { id, name, amount, orderId };
    return editedProduct;
  }

  public async remove(id: number): Promise<Product | null> {
    const productToBeDeleted = await this.getById(id);
    if (!productToBeDeleted) return null;

    await this.connection.execute(
      'DELETE FROM Trybesmith.Products WHERE id=?',
      [id],
    );

    return productToBeDeleted;
  }

  public async partialUpdate(id: Required<Product>['id'], product: Partial<Product>) {
    // const { title, price, author, isbn } = book;
    // await this.connection.execute(
    //   'UPDATE users SET title=?, price=?, author=?, isbn=? WHERE id=?',
    //   [title, price, author, isbn, id]
    const query = 'UPDATE Trybesmith.Products SET';
    const queryUpdate = Object.keys(product).map((field) => `${field}=?`).join(', ');
    const queryValues = Object.values(product);
    console.log('query update:', queryUpdate);
    console.log('query values:', queryValues);

    await this.connection.execute(
      `${query} ${queryUpdate} WHERE id=?`,
      [...queryValues, id],
    );
  }
}