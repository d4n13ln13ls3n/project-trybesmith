// ADAPT TO PRODUCT

import { NextFunction, Request, Response } from 'express';

import { CreateUserRequestBody } from '../interfaces';

import BadRequestHttpError from '../errors/httpErrors/BadRequest';

function validateData(username: string, classe: string, level: number, password: string) {
  if (password.length < 6 || password.length > 12) {
    const message = 'The field "password" must have between 6 and 12 characters';
    throw new BadRequestHttpError(message);
  }

  if (username.length < 3) {
    const message = 'The field "name" must have at least 3 characters';
    throw new BadRequestHttpError(message);
  }

  return null;
}

function fieldsExist(username: string, classe: string, level: number, password: string) {
  if (!username || !classe || !level || !password) {
    const message = 'The fields "username", "classe", "level" and "password" are required';
    throw new BadRequestHttpError(message);
  }
  return null;
}

export default function validateBody(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { username, classe, level, password } = req.body as CreateUserRequestBody;
  const fieldsError = fieldsExist(username, classe, level, password);
  const message = 'The fields "username", "classe", "level" and "password" are required';

  if (fieldsError) throw new BadRequestHttpError(message);

  const error = validateData(username, classe, level, password);

  if (error) throw new BadRequestHttpError('A field or more are not filled out correctly'); // REVISAR MENSAGEM

  next();
}