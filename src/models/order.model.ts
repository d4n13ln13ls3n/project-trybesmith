import { Pool, ResultSetHeader } from 'mysql2/promise';

import { OrderDTO, NewOrderPayload } from '../interfaces';

export default class OrderModel {
  public pool: Pool;

  constructor(connection: Pool) {
    this.pool = connection;
  }

  public async getAll() {
    const [result] = await this.pool
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

  public async getById(id: number): Promise<OrderDTO | null> {
    const result = await this.pool
      .execute(
        `SELECT o.id, o.userId, p.productsIds
        FROM Trybesmith.Orders AS o
        JOIN Trybesmith.Products AS p
        ON o.id = p.orderId WHERE id=?`, 
        [id],
      );
    const [rows] = result;
    const [order] = rows as OrderDTO[];
    return order || null;
  }

  public async create(order: NewOrderPayload): Promise<OrderDTO> {
    const { productsIds, userId } = order;

    const conn = await this.pool.getConnection();

    await conn.beginTransaction();

    const [result] = await conn.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Orders (userId) VALUES (?)',
      [userId],
    );
    
    // const [dataInserted] = result;
    const { insertId: id } = result;
        
    // await this.connection.execute(
    //   'UPDATE Trybesmith.Products SET orderId = ? WHERE id IN(?)',
    //   [id, productsIds],
    // );
    await Promise.all(
      productsIds.map(async (productId) =>
        conn.execute(
          'UPDATE Trybesmith.Products SET orderId = ? WHERE id = ?',
          [id, productId],
        )),
    );

    await conn.commit();

    return { id, ...order };
  }

  public async remove(id: number): Promise<void> {
    const orderToBeDeleted = await this.getById(id);
    if (!orderToBeDeleted) return;

    await this.pool.execute(
      'DELETE FROM Trybesmith.Orders WHERE id=?',
      [id],
    );
  }
}