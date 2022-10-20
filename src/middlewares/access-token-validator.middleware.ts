import { NextFunction, Request, Response } from 'express';
// import jwt from 'jsonwebtoken';
// import env from '../config/env';
import LoginService from '../services/login.service';
import UnauthorizedHttpError from '../errors/httpErrors/UnauthorizedHttpError';

// import HttpError from '../errors/HttpError';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');
  if (!token) {
    throw new UnauthorizedHttpError('Invalid token');
  }
  const decodedUser = LoginService.validateAccessToken(token);
  req.user = decodedUser;
  next();
};