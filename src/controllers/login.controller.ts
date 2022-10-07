import { Request, Response } from 'express';
import { User } from '../interfaces';
import LoginService from '../services/login.service';

export default class AuthenticationController {
  private loginService: LoginService;

  constructor() {
    this.loginService = new LoginService();
  }

  public login = async (req: Request, res: Response) => {
    const token = await LoginService.createAccessToken(
      req.body as User,
    );

    return res.status(200).send({ token });
  };
}