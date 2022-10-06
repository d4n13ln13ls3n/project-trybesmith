import connection from '../models/connection';
import UserModel from '../models/user.model';
import { CreateUserRequestBody } from '../interfaces';
import BadRequestHttpError from '../errors/httpErrors/BadRequest';
import NotFoundHttpError from '../errors/httpErrors/NotFound';

class UserService {
  public userModel: UserModel;

  constructor() {
    this.userModel = new UserModel(connection);
  }

  private async ensuresUserExist(id: number) {
    const user = await this.userModel.getById(id);

    if (!user) {
      const error = new NotFoundHttpError('User not found');
      throw error;
    }

    return user;
  }

  public async getAll() {
    return this.userModel.getAll();
  }

  public async getById(id: number) {
    return this.ensuresUserExist(id);
  }

  public async create(payload: CreateUserRequestBody) { // REVISAR
    const userExists = await this.userModel.getByUsername(payload.username);

    if (userExists) {
      throw new BadRequestHttpError('User already exists');
    }

    return this.userModel.create(payload);
  }

  public async update(id: number, user: CreateUserRequestBody) {
    await this.ensuresUserExist(id);
    return this.userModel.update(id, user);
  }

  public async remove(id: number) {
    await this.ensuresUserExist(id);
    await this.userModel.remove(id);
  }

  public async partialUpdate(
    id: number,
    patch: CreateUserRequestBody,
  ): Promise<void> {
    await this.ensuresUserExist(id);
    await this.userModel.partialUpdate(id, patch);
  }
}

export default UserService;