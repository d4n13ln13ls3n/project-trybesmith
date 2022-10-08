import { NextFunction, Request, Response } from 'express';

import { CreateProductRequestBody } from '../interfaces';

const nameLength = '"name" length must be at least 3 characters long';
const amountLength = '"amount" length must be at least 3 characters long';
const nullName = '"name" is required';
const nullAmount = '"amount" is required';
const wrongTypeName = '"name" must be a string';
const wrongTypeAmount = '"amount" must be a string';

function fieldsExist(
  name: string | null, 
  amount: string | null, 
  req: Request, 
  res: Response,
): Response | null {
  if (!name) return res.status(400).json({ message: nullName });
  
  if (!amount) return res.status(400).json({ message: nullAmount });

  return null;
}

function validateData(name: string, amount: string, req: Request, res: Response) {
  if (name.length < 3) return res.status(422).json({ message: nameLength });
  
  if (amount.length < 3) return res.status(422).json({ message: amountLength });

  return null;
}

function rightType(name: string, amount: string, req: Request, res: Response) {
  if (typeof name !== 'string') return res.status(422).json({ message: wrongTypeName });
  
  if (typeof amount !== 'string') return res.status(422).json({ message: wrongTypeAmount });

  return null;
}

export default function validateBody(req: Request, res: Response, next: NextFunction) {
  const { name, amount } = req.body as CreateProductRequestBody;
  
  fieldsExist(name, amount, req, res);
  validateData(name, amount, req, res);
  rightType(name, amount, req, res);
  
  next();
}