import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { CreateUserInteractor } from './create-user.interactor';
import { GetUserByIdInteractor } from '@/user/get-user-by-id.interactor';

@Injectable()
export class UserService {
  constructor(
    private createUserInteractor: CreateUserInteractor,
    private getUserByIdInteractor: GetUserByIdInteractor,
  ) {}

  createUser(user: UserDto) {
    return this.createUserInteractor.execute(user);
  }

  getUserById(id: number) {
    return this.getUserByIdInteractor.execute(id);
  }
}
