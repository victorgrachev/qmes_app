import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserInteractor } from './create-user.interactor';
import { GetUserByIdInteractor } from './get-user-by-id.interactor';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [CreateUserInteractor, GetUserByIdInteractor, UserService],
  exports: [UserService],
})
export class UserModule {}
