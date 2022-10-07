import { Request, Response } from 'express';

import { CreateUserRequestBody } from '../interfaces';
import UserService from '../services/user.service';
import LoginService from '../services/login.service';

class UserController {
  private userService: UserService;

  private loginService: LoginService;

  constructor() {
    this.userService = new UserService();
    this.loginService = new LoginService();
  }

  public getAll = async (req: Request, res: Response) => {
    const users = await this.userService.getAll();
    res.status(200).json(users);
  };

  public getById = async (req: Request, res: Response) => {
    const { id } = req.params; // estava com PARSEINT antes
    const user = await this.userService.getById(Number(id));
    res.status(200).json(user);
  };

  public create = async (req: Request, res: Response) => {
    const user = await this.userService.create(
      req.body as CreateUserRequestBody,
    );
    console.log('user inside controller:', user);
    const token = LoginService.createAccessToken(user);
    console.log('token:', token);
    return res.status(201).json({ token });
  };

  public update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user = await this.userService.update(
      id,
      req.body as CreateUserRequestBody,
    );
    res.status(200).json(user);
  };

  public remove = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    await this.userService.remove(id);
    res.status(204).send();
  };
}

export default UserController;