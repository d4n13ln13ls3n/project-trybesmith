import { Request, Response } from 'express';
import { AuthenticationCredentials } from '../interfaces';
import AuthenticationService from '../services/authentication.service';

export default class AuthenticationController {
  private authenticationService: AuthenticationService;

  constructor() {
    this.authenticationService = new AuthenticationService();
  }

  public login = async (req: Request, res: Response) => {
    const token = await this.authenticationService.login(
      req.body as AuthenticationCredentials,
    );

    return res.status(200).send({ token });
  };
}