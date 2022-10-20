import { NextFunction, Request, Response } from 'express';

import { NewOrderRequestBody } from '../interfaces';

// const nameLength = '"name" length must be at least 3 characters long';
// const amountLength = '"amount" length must be at least 3 characters long';
// const nullName = '"name" is required';
// const nullAmount = '"amount" is required';
// const wrongTypeName = '"name" must be a string';
// const wrongTypeAmount = '"amount" must be a string';
const nullProductsIds = '"productsIds" is required';
const wrongFormat = '"productsIds" must be an array';
const emptyArray = '"productsIds" must include only numbers';

function fieldsExist(
  productsIds: number[] | null, 
  req: Request, 
  res: Response,
): Response | null {
  if (!productsIds) {
    return res.status(400).json({ message: nullProductsIds });
  }
  
  return null;
}

function validateFormat(productsIds: number[] | null, req: Request, res: Response) {
  if (!Array.isArray(productsIds)) {
    return res.status(422).json({ message: wrongFormat });
  }

  return null;
}

function isArrayEmpty(productsIds: number[], req: Request, res: Response) {
  if (!productsIds.length) {
    return res.status(422).json({ message: emptyArray });
  }

  return null;
}

export default function validateBody(req: Request, res: Response, next: NextFunction) {
  const { productsIds } = req.body as NewOrderRequestBody;
  
  fieldsExist(productsIds, req, res);
  validateFormat(productsIds, req, res);
  isArrayEmpty(productsIds, req, res);
  
  next();
}