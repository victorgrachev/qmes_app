import { Body, Controller, Post } from '@nestjs/common';
import { Public } from 'src/shared/decorator/public.decorator';
import { BodyUser } from 'src/user/dto/body-create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Public()
  @Post('create')
  createUser(@Body() user: BodyUser) {
    return this.userService.createUser(user);
  }
}
