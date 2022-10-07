import { Pool, ResultSetHeader } from 'mysql2/promise'; // ResultSetHeader

import { FullOrder } from '../interfaces';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll() {
    const [result] = await this.connection
      .execute<ResultSetHeader>(
      `SELECT o.id, o.userId, JSON_ARRAYAGG(p.id) as productsIds
        FROM Trybesmith.Orders AS o
        JOIN Trybesmith.Products AS p
        ON o.id = p.orderId
        GROUP BY o.id
        `,
    );
    return result;
  }

  public async getById(id: number): Promise<FullOrder | null> {
    const result = await this.connection
      .execute(
        `SELECT o.id, o.userId, p.productsIds
        FROM Trybesmith.Orders AS o
        JOIN Trybesmith.Products AS p
        ON o.id = p.orderId WHERE id=?`, 
        [id],
      );
    const [rows] = result;
    const [order] = rows as FullOrder[];
    return order || null;
  }

  // public async create(order: NewOrder): Promise<NewOrderFulfilled> {
  //   const { productsIds } = order;
  //   const userId = req.body.user.id
  //   const result = await this.connection.execute<ResultSetHeader>(
  //     'INSERT INTO Trybesmith.Orders (userId, productsIds) VALUES (?, ?)',
  //     [userId, productsIds],
  //   );

  //   return { order };
  // }

  public async remove(id: number): Promise<FullOrder | null> {
    const orderToBeDeleted = await this.getById(id);
    if (!orderToBeDeleted) return null;

    await this.connection.execute(
      'DELETE FROM Trybesmith.Orders WHERE id=?',
      [id],
    );

    return orderToBeDeleted;
  }
}