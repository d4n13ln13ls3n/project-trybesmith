import { Pool, ResultSetHeader } from 'mysql2/promise';

import { CreateUserRequestBody, User } from '../interfaces';

export default class UserModel {
  constructor(private connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users');
    const [rows] = result;
    return rows as User[];
  }

  public async getById(id: number): Promise<User | null> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users WHERE id=?', [id]);
    const [rows] = result;
    const [user] = rows as User[];
    return user || null;
  }

  public async getByUsername(username: string): Promise<User | null> {
    const result = await this.connection
      .execute('SELECT * FROM Trybesmith.Users WHERE username = ?', [username]);
    const [rows] = result;
    const [user] = rows as User[];

    return user || null;
  }

  public async create(user: CreateUserRequestBody): Promise<User> {
    const { username, classe, level, password } = user;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.Users (username, classe, level, password) VALUES (?, ?, ?, ?)',
      [username, classe, level, password],
    );

    const [dataInserted] = result;
    const { insertId: id } = dataInserted;
    return { id, ...user };
  }

  public async update(id: number, user: CreateUserRequestBody): Promise<User> {
    const { username, classe, level, password } = user;
    await this.connection.execute(
      'UPDATE Trybesmith.Users SET name = ?, email = ?, password = ? WHERE id = ?',
      [username, classe, level, password, id],
    );

    const editedUser: User = { id, username, classe, level, password };
    return editedUser;
  }

  public async remove(id: number): Promise<User | null> {
    const userToBeDeleted = await this.getById(id);
    if (!userToBeDeleted) return null;

    await this.connection.execute(
      'DELETE FROM Trybesmith.Users WHERE id=?',
      [id],
    );

    return userToBeDeleted;
  }

  public async partialUpdate(id: Required<User>['id'], user: Partial<User>) {
    // const { title, price, author, isbn } = book;
    // await this.connection.execute(
    //   'UPDATE Trybesmith.Users SET title=?, price=?, author=?, isbn=? WHERE id=?',
    //   [title, price, author, isbn, id]
    const query = 'UPDATE Trybesmith.Users SET';
    const queryUpdate = Object.keys(user).map((field) => `${field}=?`).join(', ');
    const queryValues = Object.values(user);
    console.log('query update:', queryUpdate);
    console.log('query values:', queryValues);

    await this.connection.execute(
      `${query} ${queryUpdate} WHERE id=?`,
      [...queryValues, id],
    );
  }
}