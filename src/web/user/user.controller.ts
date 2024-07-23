import { Body, Controller, Post, Res } from '@nestjs/common';
import { UserDto } from '@/user/user.dto';
import { UserService } from '@/user/user.service';
import { Response } from 'express';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('create')
  async create(
    @Body() user: UserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const createdUser = await this.userService.createUser(user);

    response.cookie('userId', createdUser.id);

    return createdUser;
  }
}
