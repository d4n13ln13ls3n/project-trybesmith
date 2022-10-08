import { NextFunction, Request, Response } from 'express';

import { CreateUserRequestBody } from '../interfaces';

const usernameLength = '"username" length must be at least 3 characters long';
const nullUsername = '"username" is required';
const wrongTypeUsername = '"username" must be a string';
const classLength = '"classe" length must be at least 3 characters long';
const nullClass = '"classe" is required';
const wrongTypeClass = '"classe" must be a string';
const levelLength = '"level" must be greater than or equal to 1';
const nullLevel = '"level" is required';
const wrongTypeLevel = '"level" must be a number';
const passwordLength = '"password" length must be at least 8 characters long';
const nullPassword = '"password" is required';
const wrongTypePassword = '"password" must be a string';

function usernameAndClassExist(
  username: string | null, 
  classe: string | null, 
  req: Request, 
  res: Response,
): Response | null {
  if (!username) return res.status(400).json({ message: nullUsername });
  
  if (!classe) return res.status(400).json({ message: nullClass });

  return null;
}

function levelAndPasswordExist(
  level: number | null,
  password: string | null,
  req: Request, 
  res: Response,
): Response | null {
  if (!level) return res.status(400).json({ message: nullLevel });

  if (!password) return res.status(400).json({ message: nullPassword });

  return null;
}

function validateUsernameAndClass(username: string, classe: string, req: Request, res: Response) {
  if (username.length < 3) return res.status(422).json({ message: usernameLength });
  
  if (classe.length < 3) return res.status(422).json({ message: classLength });

  return null;
}

function validateLevelAndPassword(level: number, password: string, req: Request, res: Response) {
  if (level < 1) return res.status(422).json({ message: levelLength });
  
  if (password.length < 8) return res.status(422).json({ message: passwordLength });

  return null;
}

function rightTypeUsernameAndClass(username: string, classe: string, req: Request, res: Response) {
  if (typeof username !== 'string') return res.status(422).json({ message: wrongTypeUsername });
  
  if (typeof classe !== 'string') return res.status(422).json({ message: wrongTypeClass });

  return null;
}

function rightTypeLevelAndPassword(level: number, password: string, req: Request, res: Response) {
  if (typeof level !== 'number') return res.status(422).json({ message: wrongTypeLevel });
  
  if (typeof password !== 'string') return res.status(422).json({ message: wrongTypePassword });

  return null;
}

export default function validateBody(req: Request, res: Response, next: NextFunction) {
  const { username, classe, level, password } = req.body as CreateUserRequestBody;
  
  usernameAndClassExist(username, classe, req, res);
  levelAndPasswordExist(level, password, req, res);
  validateUsernameAndClass(username, classe, req, res);
  validateLevelAndPassword(level, password, req, res);
  rightTypeUsernameAndClass(username, classe, req, res);
  rightTypeLevelAndPassword(level, password, req, res);
  
  next();
}