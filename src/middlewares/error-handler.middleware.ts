import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/httpErrors/HttpError';

export default (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (res.headersSent) {
    return next(err);
  }

  if (err instanceof HttpError) {
    return res.status(err.status).send({ message: err.message });
  }

  res.status(500).send({ message: err.message });
};