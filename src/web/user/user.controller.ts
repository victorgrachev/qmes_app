import {
  Body,
  Controller,
  HttpCode,
  Post,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { UserCreateResponseDto } from '@/web/user/user-create-response.dto';
import { CreateUserDtoRequest } from '@/web/user/user-create-request.dto';
import { CreateUserInteractor } from '@/user/create-user.interactor';
import { UserInterceptor } from '@/web/user/user.interceptor';

@ApiTags('QMess')
@Controller('user')
export class UserController {
  constructor(private createUserInteractor: CreateUserInteractor) {}

  @ApiOkResponse({
    description: 'Пользователь успешно создан',
    type: UserCreateResponseDto,
  })
  @UseInterceptors(UserInterceptor)
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async create(
    @Body() { username }: CreateUserDtoRequest,
  ): Promise<UserCreateResponseDto> {
    return await this.createUserInteractor.execute({ username });
  }
}
