import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@/user/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GetUserByIdInteractor {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async execute(id: number) {
    return this.userRepository.findOneBy({ id });
  }
}
