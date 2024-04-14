import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.userRepository.save(createUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async update(updateUserDto: UpdateUserDto, id: number) {
    try {
      return await this.userRepository.update(updateUserDto, id);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
