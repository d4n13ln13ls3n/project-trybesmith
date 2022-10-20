import jwt from 'jsonwebtoken';
import env from '../config/env';

import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';
import { AuthenticationCredentials, User, JWTPayload } from '../interfaces';
import connection from '../models/connection';
import UserModel from '../models/user.model';

const INVALID_FIELDS = 'Invalid username or password';

export default class LoginService {
  private userModel: UserModel;
  
  constructor() {
    this.userModel = new UserModel(connection);
  }
  
  public async login({ username, password }: AuthenticationCredentials) {
    const data = await this.userModel.getByUsername(username);

    if (data === null) {
      throw new UnauthorizedHttpError(INVALID_FIELDS);
    }

    if (data.password !== password) {
      throw new UnauthorizedHttpError(INVALID_FIELDS);
    }
    return jwt.sign({ username }, env.jwtSecret, { expiresIn: '1w' });   
  }

  static createAccessToken(user: User) {
    // const userToAuthenticate = await this.userModel.getByUsername(user.username);
    // console.log('userToAuthenticate:', userToAuthenticate);
    const { username, id } = user;
    const token = jwt.sign({ username, id }, env.jwtSecret, { expiresIn: '1w' });
    console.log('token inside login service:', token);
    console.log('username:', username);
    console.log('user:', user);
    return token;
  }

  static validateAccessToken(token: string) {
    // const token = req.header('Authorization');
    // const token = this.createAccessToken(user);

    if (!token) {
      throw new UnauthorizedHttpError(INVALID_FIELDS);
    }

    try {
      const decoded = jwt.verify(token, env.jwtSecret);
      console.log('decoded token:', decoded);
      return decoded as JWTPayload;
    } catch (err) {
      throw new UnauthorizedHttpError(INVALID_FIELDS);
    }
  }
}