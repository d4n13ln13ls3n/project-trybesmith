import jwt from 'jsonwebtoken';
import env from '../config/env';

import HttpError from '../errors/HttpError';
import { AuthenticationCredentials } from '../interfaces';
import connection from '../models/connection';
import UserModel from '../models/user.model';

export default class AuthenticationService {
  private userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  public async login({ username, password }: AuthenticationCredentials) {
    const data = await this.userModel.getByUsername(username);

    if (data === null) {
      throw new HttpError({
        status: 401,
        message: 'Invalid username or password',
      });
    }

    if (data.password !== password) {
      throw new HttpError({
        status: 401,
        message: 'Invalid email or password',
      });
    }
    return jwt.sign({ username }, env.jwtSecret, { expiresIn: '1w' });   
  }
}