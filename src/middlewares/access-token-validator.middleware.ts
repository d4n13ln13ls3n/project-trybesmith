import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import env from '../config/env';
import LoginService from '../services/login.service';
import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';

// import HttpError from '../errors/HttpError';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  console.log('token inside access-token-validator:', token);
  if (!token) {
    throw new UnauthorizedHttpError('Token not found');
  }
  const decodedUser = LoginService.validateAccessToken(token);
  console.log('decodedUser:', decodedUser);
  req.user = decodedUser;
  next();
};