import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import env from '../config/env';

import HttpError from '../errors/HttpError';

export default async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    throw new HttpError({ status: 401, message: 'Invalid token' });
  }

  try {
    jwt.verify(token, env.jwtSecret);
    next();
  } catch (err) {
    throw new HttpError({ status: 401, message: 'Expired or invalid token' });
  }
};