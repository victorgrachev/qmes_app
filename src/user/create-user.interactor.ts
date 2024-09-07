import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateUserInteractor {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  execute(user: { username: string }) {
    return this.userRepository.save(user);
  }
}
